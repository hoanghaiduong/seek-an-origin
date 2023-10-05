import { EUnitTypeOutput } from "src/common/enum/EUnitOutput";
import { EUnitTypeQuantity } from "src/common/enum/EUnitTypeQuantity";
import { ProductionArea } from "src/production-area/entities/production-area.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AddtionalLicense {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        nullable: true
    })
    phoneContact: string;
    @Column({
        nullable: true
    })
    email: string;

    @Column({
        nullable: true
    })
    description: string;
    @Column({
        nullable: true
    })
    address: string;

    // đơn vị sản lượng
    @Column({
        nullable: false
    })
    outputUnit: EUnitTypeOutput;

    @Column({
        nullable: false
    })
    unitOfQuantity: EUnitTypeQuantity;
   
    @OneToOne(() => ProductionArea, productionArea => productionArea.additionalLicense)
    productionArea: ProductionArea

    //kỹ thuật viên
    //vật tư đầu vào
    //giống
    //Nhà xưởng liên kết
    
}
