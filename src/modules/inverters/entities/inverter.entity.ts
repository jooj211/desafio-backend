import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Reading } from '../../metrics/entities/reading.entity';
import { Plant } from '../../plants/entities/plant.entity';

@Entity('inverters')
export class Inverter {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    model: string;


    @Column({ name: 'plant_id' })
    plantId: number;

    @ManyToOne(() => Plant, plant => plant.inverters, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'plant_id' })
    plant: Plant;

    @OneToMany(() => Reading, reading => reading.inverter)
    readings: Reading[];
}
