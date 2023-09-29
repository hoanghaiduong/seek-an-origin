import { BaseEntity } from "src/base/entities/base.entity";
import { District } from "src/districts/entities/district.entity";
import { Entity, OneToMany } from "typeorm";

@Entity()
export class Province extends BaseEntity {
    @OneToMany(() => District, districts => districts.province)
    districts: District[]
}
