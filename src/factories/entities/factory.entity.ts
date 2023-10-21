import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Factory {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    
}
