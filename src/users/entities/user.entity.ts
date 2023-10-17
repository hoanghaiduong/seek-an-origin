import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { DateTimeEntity } from 'src/common/entities/DateTime.entity';
import { MemberShip } from 'src/member-ships/entities/member-ship.entity';
@Entity()
export class User extends DateTimeEntity {
    @PrimaryColumn({
        nullable: false,
    })
    uid: string;

    @Column({
        nullable: false,
        unique: true
    })
    phoneNumber: string;
    @Column({
        nullable: true,

    })
    photoURL: string;

    @Column({
        nullable: true,
    })
    displayName: string;

    @Column({
        nullable: false,
        default: false,
        unique: true
    })
    email: string;

    @Column({
        default: false,
        nullable: true,
    })
    disabled: boolean;

    @Column({
        nullable: false,
        default: false
    })
    emailVerified: boolean;
    @Column({
        nullable: false,
    })
    @Exclude()
    password: string;

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 12);
    }



    @ManyToOne(() => MemberShip, memberShip => memberShip.users)
    memberShip: MemberShip;

    async comparePassword(candidatePassword: string): Promise<boolean> {
        return await bcrypt.compare(candidatePassword, this.password);
    }
    //THIẾU
    //vùng sản xuất (+)
    //thuộc nhà xưởng (+)


    @Column({
        nullable: true,
    })
    sepecificAddress: string; //Địa chỉ cụ thể
    @Column({
        nullable: true,
    })
    generalInformation: string; //Thông tin chung trong update profile
    @Column({
        nullable: true,
    })
    certificationPhoto: string;    //Hình ảnh chứng nhận 
    @Column({
        nullable: true,
    })
    careerTitle: string; //Chức danh 
}
