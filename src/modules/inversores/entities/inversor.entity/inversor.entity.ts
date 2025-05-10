import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Usina } from "src/modules/usinas/entities/usina.entity/usina.entity";

@Entity('inversores')
export class Inversor {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column()
    modelo: string;

    @ManyToOne(() => Usina, usina => usina.id)
    usina: Usina;
}