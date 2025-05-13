import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreatePlantDto } from './dtos/create-plant.dto';
import { UpdatePlantDto } from './dtos/update-plant.dto';
import { Plant } from './entities/plant.entity';

@Injectable()
export class PlantsService {
    constructor(
        @InjectRepository(Plant)
        private readonly plantRepository: Repository<Plant>,
    ) {}

    /**
     * List all plants, including inverters relation.
     */

    async findAll(): Promise<Plant[]> {
        return this.plantRepository.find({ relations: ['inverters'] });
    }

    /**
     * Get single plant by ID.
     */

    async findOne(id: number): Promise<Plant> {
        const plant = await this.plantRepository.findOne({
            where: { id },
            relations: ['inverters'],
        });
        if(!plant) {
            throw new NotFoundException(`Plant with ID ${id} not found.`);
        }
        return plant;
    }

    /**
     * Create new plant from DTO.
     */

    async create(createPlantDto: CreatePlantDto): Promise<Plant> {
        const plant = this.plantRepository.create(createPlantDto);
        return this.plantRepository.save(plant);
    }

    /**
     * Update plant fields.
     */

    async update(id: number, updatePlantDto: UpdatePlantDto): Promise<Plant> {
        await this.plantRepository.update(id, updatePlantDto);
        return this.findOne(id);
    }

    /**
     * Delete plant by ID.
     */

    async remove(id: number): Promise<void> {
        const result: DeleteResult = await this.plantRepository.delete(id);
        if(result.affected === 0) {
            throw new NotFoundException(`Plant with ID ${id} not found.`);
        }
    }
}

