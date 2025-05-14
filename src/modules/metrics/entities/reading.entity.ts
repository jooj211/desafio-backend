/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from "typeorm";
import { Inverter } from "src/modules/inverters/entities/inverter.entity";

@Entity('readings')
export class Reading {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'datetime' })
    timestamp: Date;

    @Column('float')
    power: number;

    @Column('float')
    temperature: number;


    @Column({ name: 'inverter_id' })
    inverterId: number;

    @ManyToOne(() => Inverter, inverter => inverter.readings, {
    onDelete: 'CASCADE',
    })
    
    @JoinColumn({ name: 'inverter_id' })
    inverter: Inverter;
}