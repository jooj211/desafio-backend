import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Plant } from "src/modules/plants/entities/plant.entity";

@Entity('inverters')
export class Inverter {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    model: string;

    @ManyToOne(() => Plant, plant => plant.inverters, {onDelete: 'CASCADE'})
    @JoinColumn({ name: 'plant_id' })
    plant: Plant;
}