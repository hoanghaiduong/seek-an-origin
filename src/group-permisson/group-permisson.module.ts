import { Module } from '@nestjs/common';
import { GroupPermissonService } from './group-permisson.service';
import { GroupPermissonController } from './group-permisson.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupPermisson } from './entities/group-permisson.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GroupPermisson])],
  controllers: [GroupPermissonController],
  providers: [GroupPermissonService],
  exports: [GroupPermissonService]
})
export class GroupPermissonModule { }
