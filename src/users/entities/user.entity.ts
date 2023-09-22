import { BeforeInsert, Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
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
    })
    phoneNumber: string;

    @Column({
        nullable: true,
    })
    displayName: string;

    @Column({
        nullable: false,
        default: false,
    })
    email: string;

    @Column({
        default: false,
        nullable: true,
    })
    disabled: boolean;

    @Column({
        type: 'jsonb',
        nullable: true,
    })
    firebase: object;

    @Column({
        nullable: false,
    })
    @Exclude()
    password: string;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }

    @ManyToOne(() => MemberShip, memberShip => memberShip.users)
    memberShip: MemberShip;
}
