import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Plant } from './entities/plant.entity';
import { CreatePlantDto } from './dtos/create-plant.dto';
import { UpdatePlantDto } from './dtos/update-plant.dto';

@Injectable()
export class PlantsService {
    constructor(
        @InjectRepository(Plant)
        private readonly plantRepository: Repository<Plant>,
    ) {}

    async findAll(): Promise<Plant[]> {
        return this.plantRepository.find({ relations: ['inverters'] });
    }

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

    async create(createPlantDto: CreatePlantDto): Promise<Plant> {
        const plant = this.plantRepository.create(createPlantDto);
        return this.plantRepository.save(plant);
    }

    async update(id: number, updatePlantDto: UpdatePlantDto): Promise<Plant> {
        await this.plantRepository.update(id, updatePlantDto);
        return this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        const result: DeleteResult = await this.plantRepository.delete(id);
        if(result.affected === 0) {
            throw new NotFoundException(`Plant with ID ${id} not found.`);
        }
    }
}

