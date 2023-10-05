import { AddtionalLicense } from "src/addtional-license/entities/addtional-license.entity";
import { EUnitTypeArea } from "src/common/enum/EUnitArea";
import { Province } from "src/provinces/entities/province.entity";
import { RelationLicense } from "src/relation-license/entities/relation-license.entity";
import { TypeModel } from "src/type-model/entities/type-model.entity";
import { UnitType } from "src/unit-type/entities/unit-type.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { BeforeInsert } from "typeorm";

@Entity()
export class ProductionArea {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        nullable: false
    })
    name: string;

    @Column({
        type: 'varchar',
        unique: true, // Đảm bảo tính duy nhất
        nullable: false
    })
    code: string;
    // Xác định quan hệ với ModelType
    @ManyToOne(() => TypeModel)
    @JoinColumn({
        name: 'typeModelId'
    })
    typeModel: TypeModel;
    @Column({
        nullable: true
    })
    typeModelId: string;


    // Xác định quan hệ với UnitType

    @Column({
        nullable: false
    })
    unitType: EUnitTypeArea;

    @ManyToOne(() => Province)
    @JoinColumn({ name: "provinceId" })
    province: Province;
    @Column({
        nullable: true
    })
    provinceId: string;


    @Column({
        type: 'text',
        array: true,
        nullable: false
    })
    images: string[];

    @Column({
        type: 'float',
        nullable: false
    })
    acreage: number;

    @Column({
        nullable: false,
        default: false
    })
    extend: boolean;

    // Hàm sẽ được gọi trước khi thêm một bản ghi mới vào cơ sở dữ liệu
    @BeforeInsert()
    async generateUniqueCode() {
        // Tạo mã mới dựa trên tên và ngày tháng năm giờ phút giây
        const namePart = this.name.substring(0, 2).toUpperCase();
        const date = new Date();
        const datePart = `${date.getDate()}${date.getMonth() + 1}${date.getFullYear()}`;
        const timePart = `${date.getHours()}${date.getMinutes()}${date.getSeconds()}`;
        this.code = `${namePart}${datePart}${timePart}`;

    }

    @OneToOne(() => RelationLicense, relationLicense => relationLicense.productionArea)
    @JoinColumn()
    relationLicense: RelationLicense;

    @OneToOne(() => AddtionalLicense, additionalLicense => additionalLicense.productionArea)
    @JoinColumn()
    additionalLicense: AddtionalLicense;

}
