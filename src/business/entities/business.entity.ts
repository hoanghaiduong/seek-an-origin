import { DateTimeEntity } from "src/common/entities/DateTime.entity";
import { TypeModel } from "src/type-model/entities/type-model.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Business extends DateTimeEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false })
    name: string;

    @Column({
        type: 'text',
        array: true
    })
    avatar: string[];
    @Column({
        type: 'text',
        array: true
    })
    licenseBusiness: string[];
    @Column({
        type: 'text',
        array: true
    })
    certificate: string[];
   
    @Column({
        type: 'text',
        array: true
    })
    inspectionPhoto: string[];

    @Column({ nullable: true })
    phoneNumber: string;

    @Column({ nullable: true })
    email: string;

    @Column({ nullable: true })
    address: string;

    @Column({ nullable: true })
    taxCode: string;

    @Column({
        default: false
    })
    advanced: boolean

    @ManyToOne(() => User)
    user: User;

    @ManyToOne(() => TypeModel)
    typeModel: TypeModel


  
}
