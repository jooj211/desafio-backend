import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Inverter } from '../inverters/entities/inverter.entity';
import { Repository, UpdateDescription } from 'typeorm';
import { Reading } from './entities/reading.entity';
import { CreateReadingDto } from './dto/create-reading.dto';
import { UpdateReadingDto } from './dto/update-reading.dto';


@Injectable()
export class MetricsService {
    constructor(
        @InjectRepository(Reading)
        private readonly readingRepo: Repository<Reading>,

        @InjectRepository(Inverter)
        private readonly inverterRepo: Repository<Inverter>,
    ) {}

    findAll(): Promise<Reading[]> {
        return this.readingRepo.find({ relations: ['inverter'] });
    }

    async findOne(id: number): Promise<Reading> {
        const reading = await this.readingRepo.findOne({
            where: { id },
            relations: ['inverter'],
        });
        if (!reading) throw new NotFoundException(`Reading ${id} not found`);
        return reading;
    }

    async create(dto: CreateReadingDto): Promise<Reading> {
        const inverter = await this.inverterRepo.findOneBy({ id: dto.inverterId });
        if (!inverter) throw new NotFoundException(`Inverter ${dto.inverterId} not found`);

        const reading = this.readingRepo.create({
            timestamp: dto.timestamp,
            power: dto.power,
            temperature: dto.temperature,
            inverter,
        });
        return this.readingRepo.save(reading);
    }

    async update(id: number, dto: UpdateReadingDto): Promise <Reading> {
        await this.readingRepo.update(id, dto);
        return await this.findOne(id);
    }

    async remove(id: number): Promise <void> {
        const result = await this.readingRepo.delete(id);
        if(result.affected === 0)  throw new NotFoundException(`Reading ${id} not found.`);
    }

}
