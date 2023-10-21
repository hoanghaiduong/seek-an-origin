import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { DateTimeEntity } from 'src/common/entities/DateTime.entity';
import { MemberShip } from 'src/member-ships/entities/member-ship.entity';
import { GroupPermisson } from 'src/group-permisson/entities/group-permisson.entity';
import { v4 as uuidv4 } from 'uuid'
import { Factory } from 'src/factories/entities/factory.entity';
@Entity()
export class User extends DateTimeEntity {
    @PrimaryGeneratedColumn('uuid')

    id: string;
    // @Column({
    //     nullable: true,
    // })
    // uid: string;
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

    //********************************Thêm thành viên********************************* */
    @ManyToOne(() => Factory, { nullable: true })
    factory: Factory



    @Column({
        nullable: true,
    })
    province: string
    @Column({
        nullable: true,
    })
    district: string
    @Column({
        nullable: true,
    })
    ward: string;
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

    //nhóm quyền
    @ManyToOne(() => GroupPermisson, groupPermission => groupPermission.users, { nullable: true })
    groupPermission: GroupPermisson

    // //người quản lý
    // @ManyToOne(() => User, user => user.userManagers, { onDelete: 'CASCADE', nullable: true, eager: true })
    // @JoinColumn({ name: 'uid' })
    // userManager?: User;

    // @OneToMany(() => User, user => user.userManager, { nullable: true })
    // userManagers: User[];
}
