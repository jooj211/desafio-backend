import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Inverter } from "src/modules/inverters/entities/inverter.entity";

@Entity('plants')
export class Plant {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    localization?: string;

    @OneToMany(() => Inverter, inverter => inverter.plant)
    inverters: Inverter[];
}