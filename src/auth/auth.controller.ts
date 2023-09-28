import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UploadedFile, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { FirebaseAuthGuard } from './guard/firebase.guard';
import { User } from 'src/users/entities/user.entity';
import { ApiTags } from '@nestjs/swagger';
import { Note } from 'src/common/decorators/description.decorator';
import { ApiFile, ApiFiles } from 'src/common/decorators/file.decorator';
import { FileTypes } from 'src/common/enum/file';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { SignInDTO } from './dto/sign-in-auth.dto';
import * as admin from 'firebase-admin';
import { ForgotPasswordDTO } from './dto/forgot-password.dto';
import { ChangePasswordDTO } from './dto/change-password.dto';

@Controller('auth')
@ApiTags('API AUTHENTICATION')
@UseGuards(FirebaseAuthGuard)
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signup')
  @Note("Required Token and body parameters")
  @ApiFile('photoURL', FileTypes.IMAGE)
  async auth(@Req() req: any, @Body() dto: CreateAuthDto, @UploadedFile() image: Express.Multer.File): Promise<User> {
    return await this.authService.signUp({
      ...dto,
      user: req.user,
      photoURL: image
    });
  }

  @Post('signin')
  @Note("Required Token and body parameters | có thể đăng nhập bằng email với mật khẩu hoặc số điện thoại với mật khẩu")
  async signIn(@Req() req: any, @Body() dto: SignInDTO): Promise<User> {
    return await this.authService.signIn({
      ...dto,
      user: req.user
    });
  }


  @Post('forgotPassword')
  @Note("API Quên mật khẩu")
  async forgotPassword(@Req() req: any, @Body() dto: ForgotPasswordDTO): Promise<User | any> {
    try {
      return await this.authService.forgotPassword({
        user: req.user,
        password: dto.password
      });
    } catch (error) {
      throw error;
    }
  }

  @Post("changePassword")
  @Note("API Đổi mật khẩu")
  async changePassword(@Req() req: any, @Body() dto: ChangePasswordDTO): Promise<User | any> {
    return await this.authService.resetPassword({
      ...dto,
      user: req.user
    });
  }
}
