import { BaseEntity } from "src/base/entities/base.entity";
import { User } from "src/users/entities/user.entity";
import { Entity, OneToMany } from "typeorm";

@Entity()
export class GroupPermisson extends BaseEntity {

    @OneToMany(() => User, users => users.groupPermission, { nullable: true })
    users: User[];
}
