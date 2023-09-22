import { BaseEntity } from "src/base/entities/base.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class MemberShip extends BaseEntity {
    @OneToMany(() => User, users => users.memberShip)
    users: User[]
}
