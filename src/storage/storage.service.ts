import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from "fs";
import * as sharp from "sharp";
import { join } from "path";
import { ImageTypes } from 'src/common/enum/file';
import { StringUtil } from 'src/common/utils/string.util';

@Injectable()
export class StorageService implements OnModuleInit {
    constructor(
        private readonly configService: ConfigService
    ) {

    }
    onModuleInit(): void {
        const path = join('.', this.configService.get<string>('FOLDER_UPLOAD'));
        console.log(path)
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path);
        }
    }
    
  private async uploadStorage(type: ImageTypes, file: Express.Multer.File): Promise<string> {
    const patch = this.configService.get<string>("FOLDER_UPLOAD");
    switch (file.mimetype) {
      case 'image/jpeg':
      case 'image/png':
        // Xử lý cho các loại hình ảnh JPEG và PNG
        const imageName = await this.buildImageFileName(type, file);
        const imagePath = await this.buildImageFilePath(type, imageName);
        await sharp(file.buffer).toFile(imagePath);

       
        return imagePath.replace(/\\/g, '/').replace(patch, '/uploads/');
      default:

        // Xử lý cho các trường hợp mimetype không rơi vào các trường hợp trên
        const fileName = await this.buildOtherFileName(type, file.filename)
        const filePath = await this.buildImageFilePath(type, fileName);
        await sharp(filePath).toFile(filePath)
        return filePath.replace(/\\/g, '/').replace(patch, '/uploads/');
    }

  }
  async uploadFile(type: ImageTypes, file: Express.Multer.File): Promise<string> {
    return this.uploadStorage(type, file);
  }

  async uploadMultiFiles(type: ImageTypes, files: Express.Multer.File[]): Promise<string[]> {
    return Promise.all(files.map((file) => this.uploadStorage(type, file)));
  }

  async deleteFile(fileName: string): Promise<void> {
    const path = join('public', fileName);
    // xoá  file
    console.log(path)
    fs.existsSync(path) && fs.unlinkSync(path);
  }


  private async buildImageFileName(type: ImageTypes, file: Express.Multer.File): Promise<string> {
    const extension = file.originalname.split('.').pop(); // Extract extension
    return `${type}.${StringUtil.generateRandomString(12)}.${Date.now()}.${extension}`;
  }

  private async buildOtherFileName(type: ImageTypes, fileName: string) {
    const extension = fileName.split('.').pop();
    return `${type}.${StringUtil.generateRandomString(12)}.${Date.now()}.${extension}`;

  }
  private async buildImageFilePath(type: ImageTypes, fileName: string): Promise<string> {
    const patch = this.configService.get<string>("FOLDER_UPLOAD");
    const path = join('.', patch, type);
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
    }

    return join(path, fileName);
  }


    async deleteMultiFiles(images: string[]) {
        return Promise.all(images.map((image) => this.deleteFile(image)));
    }

}