import { PartialType } from '@nestjs/swagger';
import { CreateProductionAreaDto } from './create-production-area.dto';

export class UpdateProductionAreaDto extends PartialType(CreateProductionAreaDto) {}
