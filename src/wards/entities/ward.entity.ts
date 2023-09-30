import { BaseEntity } from "src/base/entities/base.entity";
import { District } from "src/districts/entities/district.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

@Entity()
export class Ward {
    @PrimaryColumn()
    id: string;
    @Column()
    name: string;
    @Column({
        nullable: true
    })
    description: string;
    @ManyToOne(() => District, district => district.wards)
    @JoinColumn({
        name: 'districtId'
    })
    district: District
    @Column({
        nullable: false
    })
    districtId: string;
}
