import { BaseEntity } from "src/base/entities/base.entity";
import { Province } from "src/provinces/entities/province.entity";
import { Ward } from "src/wards/entities/ward.entity";
import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class District extends BaseEntity {
    @OneToMany(() => Ward, wards => wards.district)
    wards: Ward[];
    
    
    @ManyToOne(() => Province, province => province.districts)
    province: Province;
}
