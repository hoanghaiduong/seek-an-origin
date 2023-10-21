import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from 'src/users/entities/user.entity';
import { UsersService, findOneWith } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateAuthDto } from './dto/create-auth.dto';
import { StorageService } from 'src/storage/storage.service';
import { ImageTypes } from 'src/common/enum/file';
import { MemberShipsService } from 'src/member-ships/member-ships.service';
import { SignInDTO } from './dto/sign-in-auth.dto';
import { ChangePasswordDTO } from './dto/change-password.dto';
import { JwtService } from '@nestjs/jwt';
import { TokenModel } from './models/Token.model';
import { ConfigService } from '@nestjs/config';
import { ApiException } from 'src/common/exception/api.exception';
import { ErrorMessages } from 'src/exception/error.code';
import * as bcrypt from 'bcrypt'
import { SignUpDTO } from './dto/sign-up.dto';
import { GroupPermissonService } from 'src/group-permisson/group-permisson.service';
import { ForgotPasswordDTO } from './dto/forgot-password.dto';
import * as admin from 'firebase-admin'
import { SignUpSocialDTO } from './dto/sign-up-social.dto';
export interface IJwtPayload {
  id: string;
  email: string;
  phoneNumber: string;
}


@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private storageService: StorageService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private memberShipService: MemberShipsService,
    private groupPermissionService: GroupPermissonService
  ) { }

  private async getTokens(user: User): Promise<TokenModel> {
    const payload: IJwtPayload = {
      phoneNumber: user.phoneNumber,
      email: user.email,
      id: user.id,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(
        payload,
        {
          secret: this.configService.get("JWT_REFRESH_TOKEN_SECRET"),
          expiresIn: 1000 * 60 * 60 * 24 * 7, // 7 days
        })
    ])
    return new TokenModel(accessToken, refreshToken)
  }

  private async getAccessToken(user: User): Promise<TokenModel> {
    const payload: IJwtPayload = {
      phoneNumber: user.phoneNumber,
      email: user.email,
      id: user.id,
    };
    const accessToken = await this.jwtService.signAsync(payload);
    return new TokenModel(accessToken)
  }
  async validateJwt(payload: IJwtPayload): Promise<User> {
    return await this.userService.findOne(payload.id);
  }

  async validateUser(payload: string, pass: string): Promise<any> {
    const user = await this.userService.findOneBy("email" || "phoneNumber", payload);

    if (!user) throw new ApiException(ErrorMessages.USER_NOT_FOUND);

    // const isMatch = await bcrypt.compare(pass, user.password);
    const isMatch = await user.comparePassword(pass);
    return isMatch ? user : null;
  }

  async refreshToken(myUser: User): Promise<any> {
    return await this.getAccessToken(myUser);
  }

  async validateUserRefreshToken(refreshToken: string): Promise<void> {
    try {
      await this.jwtService.verifyAsync(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET')
      })
    } catch (e) {
      switch (e.name) {
        case 'TokenExpiredError':
          throw new ApiException(ErrorMessages.REFRESH_TOKEN_EXPIRED)
        case 'JsonWebTokenError':
          throw new ApiException(ErrorMessages.REFRESH_TOKEN_INVALID)
        default:
          throw new UnauthorizedException()
      }
    }
  }

  async signUpSystem(dto: SignUpDTO): Promise<User | any> {

    let image: string = "";
    try {

      if (dto.photoURL) {
        image = await this.storageService.uploadFile(ImageTypes.CARD_USER, dto.photoURL);
      }


      const memberShip = await this.memberShipService.findOne(dto.memberShipId);
      const groupPermission = await this.groupPermissionService.findByName("USER");
      return await this.userService.createUserSignUp({
        ...dto,
        photoURL: image,
        memberShip,
        groupPermission,
      });
    } catch (error) {

      await this.storageService.deleteFile(image)
      throw new BadRequestException(error.message);
    }
  }
  // async signUpSocial(dto: SignUpSocialDTO): Promise<User> {
  //   const memberShip = await this.memberShipService.findOneByName("Cá nhân");
  //   const groupPermission = await this.groupPermissionService.findByName("USER");
  //   const createUser = await this.userService.createUserSignUp({
  //     ...dto,
  //     phoneNumber: dto.phoneNumber,
  //     password: null,
  //     memberShip
  //   });
  //   return createUser;
  // }
  async signIn(dto: SignInDTO): Promise<User | any> {
    if ((dto.email || dto.phoneNumber) && dto.password) {
      // Xác định trường cần tìm kiếm dựa trên có giá trị nào trong "dto"
      const findOneWith: findOneWith = dto.email ? "email" : "phoneNumber";
      const value = dto.email || dto.phoneNumber;

      // Tìm kiếm người dùng bằng trường xác định và giá trị
      const user = await this.userService.findOneBy(findOneWith, value);

      if (user && !(await user.comparePassword(dto.password))) {
        throw new BadRequestException('Password does not match with the password of the user');
      }
      const getTokens = await this.getTokens(user);
      return {
        user,
        ...getTokens
      };
    }

    throw new BadRequestException('Invalid input');
  }

  async forgotPassword(dto: ForgotPasswordDTO): Promise<User | any> {
    const updated = await this.userService.updatePassword(dto);
    return updated;

  }

  async resetPassword(dto: ChangePasswordDTO): Promise<User | any> {
    const user = await this.userService.getUserById(dto.user.id);

    const check = await user.comparePassword(dto.oldPassword);
    if (user?.phoneNumber && !check || user?.email && !check)//check old password is correct
    {
      throw new BadRequestException('Reset password failed, old password is incorrect');
    }
    return await this.userService.updatePassword({
      user,
      password: dto.newPassword
    });
  }

}
