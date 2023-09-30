import { BaseEntity } from "src/base/entities/base.entity";
import { District } from "src/districts/entities/district.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from "typeorm";

@Entity()
export class Province {
    @PrimaryColumn()
    id: string;
    @Column()
    name: string;
    @Column({
        nullable: true
    })
    description: string;
    @OneToMany(() => District, districts => districts.province)
    districts: District[]
}
