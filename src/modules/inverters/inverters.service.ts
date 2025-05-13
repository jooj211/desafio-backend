import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { CreateInverterDto } from './dtos/create-inverter.dto';
import { UpdateInverterDto } from './dtos/update-inverter.dto';
import { Inverter } from './entities/inverter.entity';
import { Plant } from '../plants/entities/plant.entity';
import { CreatePlantDto } from '../plants/dtos/create-plant.dto';


@Injectable()
export class InvertersService {
    constructor(
        @InjectRepository(Inverter)
        private readonly inverterRepository: Repository<Inverter>,

        @InjectRepository(Plant)
        private readonly plantRepository: Repository<Plant>,
    ) {}

    async findAll(): Promise<Inverter[]> {
        return this.inverterRepository.find({ relations: ['plant'] });
    }

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

    async update(id: number, updateInverterDto: UpdateInverterDto): Promise <Inverter> {
        await this.inverterRepository.update(id, updateInverterDto);
        return this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        const result: DeleteResult = await this.inverterRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Inverter with id ${id} not found`)
        }
    }
}

