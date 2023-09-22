import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UploadedFile } from '@nestjs/common';
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
  @Note("Required Token and body parameters")
  async signIn(@Req() req: any): Promise<User> {
    return await this.authService.signIn(req?.user);
  }
}
