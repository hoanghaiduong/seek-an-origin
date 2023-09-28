import { Module } from '@nestjs/common';
import { ProductionAreaService } from './production-area.service';
import { ProductionAreaController } from './production-area.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductionArea } from './entities/production-area.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductionArea])],
  controllers: [ProductionAreaController],
  providers: [ProductionAreaService],
  exports: [ProductionAreaService]
})
export class ProductionAreaModule { }
