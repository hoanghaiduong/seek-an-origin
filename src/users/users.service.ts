import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ILike, Repository } from 'typeorm';
import { PaginationModel } from 'src/common/pagination/pagination.model';
import { Pagination } from 'src/common/pagination/pagination.dto';
import { Meta } from 'src/common/pagination/meta.dto';

import * as fs from 'fs';
import { StorageService } from 'src/storage/storage.service';
import { ImageTypes } from 'src/common/enum/file';
import { MemberShipsService } from 'src/member-ships/member-ships.service';
import { join } from 'path';
@Injectable()
export class UsersService {
  constructor(@InjectRepository(User)
  private readonly userRepository: Repository<User>,
    private storageService: StorageService,
    private memberShipService: MemberShipsService
  ) {

  }

  async findAll(pagination: Pagination): Promise<PaginationModel<User>> {
    const search = ILike(`%${pagination.search}%`);
    const [entities, itemCount] = await this.userRepository.findAndCount({
      order: {
        createdAt: pagination.order
      },
      take: pagination.take,
      skip: pagination.skip,
      relations: ['memberShip'],
      where: [
        {
          phoneNumber: search,
        },
        {
          displayName: search,
        },
        {
          email: search,
        }
      ]

    });
    const meta = new Meta({ itemCount, pagination });
    return new PaginationModel<User>(entities, meta);
  }

  async findOne(uid: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        uid
      },
      relations: ['memberShip'],
    })
    if (!user) throw new NotFoundException(`User ${uid} not found`);
    return user
  }
  async findOneWithPhoneNumber(phoneNumber: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        phoneNumber
      }
    })
    if (!user) throw new NotFoundException(`Phone ${phoneNumber} not found`);
    return user
  }
  async findOneNotException(uid: string): Promise<User | boolean> {
    const user = await this.userRepository.findOne({
      where: {
        uid
      }
    })
    if (!user) return false;
    return user
  }
  // async update(dto: UpdateUserDto): Promise<User | any> {
  //   var photoURLglobal: string;
  //   var photoCertGlobal: string;
  //   try {
  //     const user = await this.findOne(dto.user.uid);

  //     // Tạo các biến cho đường dẫn ảnh mới
  //     let photoURLdto: string | null = null;
  //     let certificationPhoto: string | null = null;

  //     // Kiểm tra xem có ảnh `photoURL` trong DTO không
  //     if (dto.photoURL) {
  //       // Kiểm tra xem user đã có ảnh `photoURL` không
  //       if (user.photoURL) {
  //         // Xoá ảnh cũ
  //         await this.storageService.deleteFile(user.photoURL);
  //       }
  //       // Tải lên ảnh mới
  //       photoURLdto = await this.storageService.uploadFile(
  //         ImageTypes.CARD_USER,
  //         dto.photoURL
  //       );
  //     } else {

  //       photoURLdto = user.photoURL;
  //     }

  //     // Kiểm tra xem có ảnh `certificationPhoto` trong DTO không
  //     if (dto.certificationPhoto) {
  //       // Kiểm tra xem user đã có ảnh `certificationPhoto` không
  //       if (!user.certificationPhoto) {
  //         // Tải lên ảnh mới
  //         certificationPhoto = await this.storageService.uploadFile(
  //           ImageTypes.CARD_USER_PROFILE_PHOTO_CERT,
  //           dto.certificationPhoto
  //         );
  //       } else {
  //         // Xoá ảnh cũ
  //         await this.storageService.deleteFile(user.certificationPhoto);
  //         // Tải lên ảnh mới
  //         certificationPhoto = await this.storageService.uploadFile(
  //           ImageTypes.CARD_USER_PROFILE_PHOTO_CERT,
  //           dto.certificationPhoto
  //         );

  //       }
  //     } else {
  //       // Nếu không có ảnh `certificationPhoto` trong DTO, sử dụng ảnh hiện có của user

  //       certificationPhoto = user.certificationPhoto;


  //     }
  //     photoCertGlobal = certificationPhoto;
  //     photoURLglobal = photoURLdto;
  //     // Kiểm tra và lấy thông tin Membership
  //     let memberShip = user.memberShip;
  //     //Logger.log(user.memberShip)
  //     if (dto.memberShipId && dto.memberShipId !== memberShip.id) {
  //       memberShip = await this.memberShipService.findOne(dto.memberShipId);
  //     }

  //     Logger.debug(certificationPhoto, photoURLdto)
  //     // Sử dụng Object.assign để cập nhật thông tin của user
  //     const merged = this.userRepository.merge(user, {
  //       careerTitle: dto.careerTitle,
  //       generalInformation: dto.generalInformation,
  //       sepecificAddress: dto.sepecificAddress,
  //       certificationPhoto: certificationPhoto,
  //       photoURL: photoURLdto,
  //       displayName: dto.displayName,
  //       memberShip: memberShip,
  //     });
  //     const updated = await this.userRepository.update(user.uid, merged);

  //     return merged;

  //   } catch (error) {
  //     const path1 = join('public', photoURLglobal);
  //     const path2 = join('public', photoCertGlobal);
  //     fs.existsSync(path1) && fs.unlinkSync(path1)
  //     fs.existsSync(path2) && fs.unlinkSync(path2)
  //     throw new BadRequestException({
  //       message: error.message,
  //     });
  //   }
  // }

  async update(dto: UpdateUserDto): Promise<User | any> {
    let tempPhotoURL: string | null = null;
    let tempCertificationPhoto: string | null = null;
    try {
      const user = await this.findOne(dto.user.uid);

      // Tạo các biến cho đường dẫn ảnh mới và sử dụng biến temp để lưu ảnh tạm thời



      // Kiểm tra và xử lý ảnh `photoURL`
      if (dto.photoURL) {
        // Xoá ảnh cũ nếu tồn tại
        if (user.photoURL) {
          await this.storageService.deleteFile(user.photoURL);
        }
        // Tải lên ảnh mới
        tempPhotoURL = await this.storageService.uploadFile(
          ImageTypes.CARD_USER,
          dto.photoURL
        );
      }
      else {
        const path = join('public', user.photoURL)
        if (user.photoURL && !fs.existsSync(path))//nếu không truyền field ảnh đại diện mà lại có dữ liệu trong database nhưng lại không có ảnh trong server
        {
          throw new BadRequestException("Ảnh đại diện không tồn tại hoặc đã bị xoá!")
        }
      }

      // Kiểm tra và xử lý ảnh `certificationPhoto`
      if (dto.certificationPhoto) {
        // Xoá ảnh cũ nếu tồn tại
        if (user.certificationPhoto) {
          await this.storageService.deleteFile(user.certificationPhoto);
        }
        // Tải lên ảnh mới
        tempCertificationPhoto = await this.storageService.uploadFile(
          ImageTypes.CARD_USER_PROFILE_PHOTO_CERT,
          dto.certificationPhoto
        );
      }
      else {
        const path = join('public', user.certificationPhoto)
        if (user.certificationPhoto && !fs.existsSync(path))//nếu không truyền field ảnh đại diện mà lại có dữ liệu trong database nhưng lại không có ảnh trong server
        {
          throw new BadRequestException("Ảnh minh chứng không tồn tại hoặc đã bị xoá!")
        }
      }

      // Kiểm tra và lấy thông tin Membership
      let memberShip = user.memberShip;
      if (dto.memberShipId && dto.memberShipId !== memberShip.id) {
        memberShip = await this.memberShipService.findOne(dto.memberShipId);
      }

      // Sử dụng Object.assign để cập nhật thông tin của user
      const merged = this.userRepository.merge(user, {
        careerTitle: dto.careerTitle,
        generalInformation: dto.generalInformation,
        sepecificAddress: dto.sepecificAddress,
        certificationPhoto: tempCertificationPhoto || user.certificationPhoto,
        photoURL: tempPhotoURL || user.photoURL,
        displayName: dto.displayName,
        memberShip: memberShip,
      });

      // Lưu thông tin người dùng đã cập nhật vào cơ sở dữ liệu
      const updated = await this.userRepository.update(user.uid, merged);

      // Trả về thông tin cập nhật
      return merged;
    } catch (error) {
      // Xoá tệp ảnh tạm thời nếu có lỗi
      if (tempPhotoURL) {
        await this.storageService.deleteFile(tempPhotoURL);
      }
      if (tempCertificationPhoto) {
        await this.storageService.deleteFile(tempCertificationPhoto);
      }
      // Xử lý lỗi và trả về lỗi BadRequest
      throw new BadRequestException({
        message: error.message,
      });
    }
  }


}
