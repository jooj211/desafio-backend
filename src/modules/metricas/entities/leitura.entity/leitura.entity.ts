import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Inversor } from "src/modules/inversores/entities/inversor.entity/inversor.entity";

@Entity('leituras')
export class Leitura {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    timestamp: Date;

    @Column('float')
    potencia: number;

    @Column('float')
    temperatura: number;

    @ManyToOne(() => Inversor, inversor => inversor.id)
    inversor: Inversor;
}