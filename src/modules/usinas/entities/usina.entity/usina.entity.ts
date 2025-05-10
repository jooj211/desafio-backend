import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

@Entity('usinas')
export class Usina {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column({ nullable: true })
    localizacao?: string;
}