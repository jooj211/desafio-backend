import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Inverter } from "src/modules/inverters/entities/inverter.entity";

@Entity('readings')
export class Reading {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    timestamp: Date;

    @Column('float')
    power: number;

    @Column('float')
    temperature: number;

    @ManyToOne(() => Inverter, inverter => inverter.id)
    inverter: Inverter;
}