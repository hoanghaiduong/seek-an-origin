import { DateTimeEntity } from 'src/common/entities/DateTime.entity';
import { PrimaryGeneratedColumn, Column } from 'typeorm';

export abstract class BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ nullable: true })
    description: string;
}
