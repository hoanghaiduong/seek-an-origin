import { BaseEntity } from "src/base/entities/base.entity";
import { Province } from "src/provinces/entities/province.entity";
import { Ward } from "src/wards/entities/ward.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";

@Entity()
export class District {
    @PrimaryColumn()
    id: string
    @Column()
    name: string;
    @Column({
        nullable: true
    })
    description: string;
    @OneToMany(() => Ward, wards => wards.district)
    wards: Ward[];
    @ManyToOne(() => Province, province => province.districts)
    @JoinColumn({
        name: 'provinceId'
    })
    province: Province;
    @Column({ nullable: false })
    provinceId: string;
}
