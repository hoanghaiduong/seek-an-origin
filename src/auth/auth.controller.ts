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
import { SignUpDTO } from './dto/sign-up.dto';
import { AuthUser } from 'src/common/decorators/auth-user.decorator';
import { AuthGuard } from './guard/Auth.guard';
import { JwtAuthGuard } from './guard/Jwt-auth.guard';
import { Roles } from 'src/common/decorators/role.decorator';
import { RoleAuthGuard } from './guard/Role.guard';
import { RefreshAuthGuard } from './guard/refresh.guard';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { TokenModel } from './models/Token.model';
import { SignUpSocialDTO } from './dto/sign-up-social.dto';

@Controller('auth')
@ApiTags('API AUTHENTICATION')
export class AuthController {
  constructor(private authService: AuthService) { }

  // @UseGuards(FirebaseAuthGuard)
  // @Post('signup')
  // @Note("Required Token and body parameters")
  // @ApiFile('photoURL', FileTypes.IMAGE)
  // async auth(@Req() req: any, @Body() dto: CreateAuthDto, @UploadedFile() image: Express.Multer.File): Promise<User> {
  //   return await this.authService.signUp({
  //     ...dto,
  //     user: req.user,
  //     photoURL: image,
  //   });
  // }

  @Post('signin')
  @Note("Có thể đăng nhập bằng email và password hoặc phone và password")
  async signIn(@Body() dto: SignInDTO): Promise<User> {
    return await this.authService.signIn(dto);
  }


  @Roles('Cá nhân')
  @UseGuards(JwtAuthGuard)//lấy được request 
  @Post('test')
  async test(@AuthUser() user: User): Promise<any> {
    return user;
  }


  @Post("refresh-tokens")
  @Note("Lấy lại token mới khi hết hạn")
  @UseGuards(RefreshAuthGuard)
  async refreshTokens(
    @AuthUser() myUser: User,
    @Body() dto: RefreshTokenDto,
  ): Promise<TokenModel> {
    return this.authService.refreshToken(myUser);

  }
  @Post('forgotPassword')
  @UseGuards(JwtAuthGuard)//lấy được request 
  @Note("API Quên mật khẩu")
  async forgotPassword(@AuthUser() user: User, @Body() dto: ForgotPasswordDTO): Promise<User | any> {
    try {
      return await this.authService.forgotPassword({
        user,
        password: dto.password
      });
    } catch (error) {
      throw error;
    }
  }

  @Post("changePassword")
  @UseGuards(JwtAuthGuard)//lấy được request 
  @Note("API Đổi mật khẩu")
  async changePassword(@AuthUser() myUser: User, @Body() dto: ChangePasswordDTO): Promise<User | any> {
    return await this.authService.resetPassword({
      ...dto,
      user: myUser
    });
  }
  // @Post('signup-social')
  // @UseGuards(FirebaseAuthGuard)
  // @Note("API Đăng ký tài khoản với phương thức đăng nhập social như google facebook")
  // async signupSocial(@AuthUser() user: admin.auth.UserRecord, dto: SignUpSocialDTO): Promise<User> {
  //   return await this.authService.signUpSocial({
  //     ...dto,
  //     email: user.email,
  //     displayName: user.displayName,
  //     photoURL: user.photoURL,
  //     phoneNumber: user.phoneNumber,
  //   });
  // }
  @Post('signup-system')
  @ApiFile('photoURL', FileTypes.IMAGE)
  async SignUpWithSystem(@Body() dto: SignUpDTO, @UploadedFile() photoURL: Express.Multer.File): Promise<User | any> {
    return await this.authService.signUpSystem({
      ...dto,
      photoURL
    });
  }
}
