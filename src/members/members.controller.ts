import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile } from '@nestjs/common';
import { MembersService } from './members.service';
import { User } from 'src/users/entities/user.entity';
import { CreateMemberDTO } from './dto/create-member.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiFile } from 'src/common/decorators/file.decorator';
import { FileTypes } from 'src/common/enum/file';


@Controller('members')
@ApiTags("API Quản Lý Thành Viên")
export class MembersController {
  constructor(private readonly membersService: MembersService) { }

  @Post('create')
  @ApiFile('avatar', FileTypes.IMAGE)
  async create(@Body() createMemberDto: CreateMemberDTO, @UploadedFile('avatar') avatar: Express.Multer.File): Promise<User> {
    return await this.membersService.create({
      ...createMemberDto,
      avatar
    });
  }

  @Get()
  findAll() {
    return this.membersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.membersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMemberDto: any) {
    return this.membersService.update(+id, updateMemberDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.membersService.remove(+id);
  }
}
