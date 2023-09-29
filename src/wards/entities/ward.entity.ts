import { BaseEntity } from "src/base/entities/base.entity";
import { District } from "src/districts/entities/district.entity";
import { Entity, ManyToOne } from "typeorm";

@Entity()
export class Ward extends BaseEntity {
    @ManyToOne(() => District, district => district.wards)
    district: District
}
