import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Material {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        nullable: false
    })
    name: string;

    @Column({
        type: 'decimal',
        nullable: false,
    })
    price: number;

    @Column({
        nullable: true
    })
    origin: string;

    @Column({
        nullable: true
    })
    barCode: string;

    @Column({
        nullable: true
    })
    internalCode: string;

    //nhà sản xuất
    // nhà nhập khẩu
    // nhà phân phối
    // nhà vận chuyển
    // người quản lý

    @Column({
        nullable: true,
        type: 'text'
    })
    storageConditions: string;

    @Column({
        nullable: true,
        type: 'text'
    })
    description: string;

    @Column({
        nullable: true,
        type: 'text'
    })
    ingredent: string;

    @Column({
        nullable: true,
        type: 'text'
    })
    uses: string;

    @Column({
        nullable: false
    })
    photo: string;

    @Column({
        nullable: true
    })
    documentImage: string;

    @Column({
        nullable: true
    })
    inspections: string;

}
