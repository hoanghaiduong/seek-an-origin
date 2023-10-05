import { ProductionArea } from "src/production-area/entities/production-area.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class RelationLicense {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        nullable: false,
        array: true,
        type: 'text'
    })
    landCerts: string[];

    @Column({
        nullable: false,
        array: true,
        type: 'text'
    })
    productionContracts: string[];

    @Column({
        nullable: false,
        array: true,
        type: 'text'
    })
    qualityCerts: string[];

    @Column({
        nullable: false,
        array: true,
        type: 'text'
    })
    testPaper: string[];

    @OneToMany(() => ProductionArea, productionArea => productionArea.relationLicense)
    productionArea: ProductionArea;
}
