import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProductionArea {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    code: string;

    // @Column()
    // typeModel: string;
    @Column({
        type:'float'
    })
    acreage: number;

    //@Column()
    //unitType:string;
}
