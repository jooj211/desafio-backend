import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Plant } from '../plants/entities/plant.entity';
import { CreateInverterDto } from './dtos/create-inverter.dto';
import { UpdateInverterDto } from './dtos/update-inverter.dto';
import { Inverter } from './entities/inverter.entity';


@Injectable()
export class InvertersService {
    constructor(
        @InjectRepository(Inverter)
        private readonly inverterRepository: Repository<Inverter>,

        @InjectRepository(Plant)
        private readonly plantRepository: Repository<Plant>,
    ) {}

    /**
     * List all inverters, including plant relation.
     */

    async findAll(): Promise<Inverter[]> {
        return this.inverterRepository.find({ relations: ['plant'] });
    }

    /**
     * Get single inverter by ID.
     */

    async findOne(id: number): Promise<Inverter> {
        const inverter = await this.inverterRepository.findOne({
            where: { id },
            relations: ['plant'],
        });
        if(!inverter) {
            throw new NotFoundException(`Inverter with ID ${id} not found`)
        }
        return inverter;
    }

    /**
     * Create new inverter from DTO.
     */

    async create(createInverterDto: CreateInverterDto): Promise<Inverter> {
        const plant = await this.plantRepository.findOneBy({ id: createInverterDto.plantId });
        if(!plant){
            throw new NotFoundException(`Plant with ID ${createInverterDto.plantId} not found`);
        }

        const inverter = this.inverterRepository.create({
            name: createInverterDto.name,
            model: createInverterDto.model,
            plant,
        });
        return this.inverterRepository.save(inverter);
    }

    /**
     * Update inverter fields.
     */

    async update(id: number, updateInverterDto: UpdateInverterDto): Promise <Inverter> {
        await this.inverterRepository.update(id, updateInverterDto);
        return this.findOne(id);
    }

    /**
     * Delete inverter by ID.
     */

    async remove(id: number): Promise<void> {
        const result: DeleteResult = await this.inverterRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Inverter with id ${id} not found`)
        }
    }
}

