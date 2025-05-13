import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inverter } from '../inverters/entities/inverter.entity';
import { CreateReadingDto } from './dtos/create-reading.dto';
import { UpdateReadingDto } from './dtos/update-reading.dto';
import { Reading } from './entities/reading.entity';

@Injectable()
export class MetricsService {
    constructor(
    @InjectRepository(Reading)
    private readonly readingRepo: Repository<Reading>,

    @InjectRepository(Inverter)
    private readonly inverterRepo: Repository<Inverter>,
    ) {}

    async findAll(): Promise<Reading[]> {
        return this.readingRepo.find({ relations: ['inverter'] });
    }

    async findOne(id: number): Promise<Reading> {
        const reading = await this.readingRepo.findOne({
            where: { id },
            relations: ['inverter'],
        });
        if (!reading) {
            throw new NotFoundException(`Reading ${id} not found`);
        }
        return reading;
    }

    async create(dto: CreateReadingDto): Promise<Reading> {
        const inverter = await this.inverterRepo.findOneBy({ id: dto.inverterId });
        if (!inverter) {
            throw new NotFoundException(`Inverter ${dto.inverterId} not found`);
        }
        const reading = this.readingRepo.create({
            timestamp: new Date(dto.timestamp),
            power: dto.power,
            temperature: dto.temperature,
            inverter,
        });
        return this.readingRepo.save(reading);
    }

    async update(id: number, dto: UpdateReadingDto): Promise<Reading> {
        const existing = await this.readingRepo.findOneBy({ id });
        if (!existing) {
            throw new NotFoundException(`Reading ${id} not found`);
        }
        if (dto.timestamp) {
            existing.timestamp = new Date(dto.timestamp);
        }
        if (dto.power !== undefined) {
            existing.power = dto.power;
        }
        if (dto.temperature !== undefined) {
            existing.temperature = dto.temperature;
        }
        if (dto.inverterId !== undefined) {
            const inv = await this.inverterRepo.findOneBy({ id: dto.inverterId });
            if (!inv) throw new NotFoundException(`Inverter ${dto.inverterId} not found`);
            existing.inverter = inv;
        }
        return this.readingRepo.save(existing);
    }

    async remove(id: number): Promise<void> {
        const result = await this.readingRepo.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Reading ${id} not found`);
        }
    }

    async getMaxPower(
    inverterId: number,
    startDate: Date,
    endDate: Date,
    ): Promise<{ date: string; maxPower: number }[]> {
        if (startDate > endDate) {
            throw new BadRequestException('start_date must be before end_date');
        }
        return this.readingRepo
            .createQueryBuilder('r')
            .select("date(r.timestamp)", 'date')
            .addSelect('MAX(r.power)', 'maxPower')
            .where('r.inverter_id = :inverterId', { inverterId })
            .andWhere('r.timestamp BETWEEN :startDate AND :endDate', { startDate, endDate })
            .groupBy("date(r.timestamp)")
            .orderBy('date')
            .getRawMany();
    }

    async getAverageTemperature(
    inverterId: number,
    startDate: Date,
    endDate: Date,
    ): Promise<{ date: string; avgTemperature: number }[]> {
        if (startDate > endDate) {
            throw new BadRequestException('start_date must be before end_date');
        }
        return this.readingRepo
            .createQueryBuilder('r')
            .select("date(r.timestamp)", 'date')
            .addSelect('AVG(r.temperature)', 'avgTemperature')
            .where('r.inverter_id = :inverterId', { inverterId })
            .andWhere('r.timestamp BETWEEN :startDate AND :endDate', { startDate, endDate })
            .groupBy("date(r.timestamp)")
            .orderBy('date')
            .getRawMany();
    }

    async getGenerationByPlant(
    plantId: number,
    startDate: Date,
    endDate: Date,
    ): Promise<{ date: string; energy: number }[]> {
        if (startDate > endDate) {
            throw new BadRequestException('start_date must be before end_date');
        }
        return this.readingRepo
            .createQueryBuilder('r')
            .select("date(r.timestamp)", 'date')
            .addSelect('SUM(r.power)', 'energy')
            .innerJoin('r.inverter', 'i')
            .where('i.plant_id = :plantId', { plantId })
            .andWhere('r.timestamp BETWEEN :startDate AND :endDate', { startDate, endDate })
            .groupBy("date(r.timestamp)")
            .orderBy('date')
            .getRawMany();
    }

    async getGenerationByInverter(
    inverterId: number,
    startDate: Date,
    endDate: Date,
    ): Promise<{ date: string; energy: number }[]> {
        if (startDate > endDate) {
            throw new BadRequestException('start_date must be before end_date');
        }
        return this.readingRepo
            .createQueryBuilder('r')
            .select("date(r.timestamp)", 'date')
            .addSelect('SUM(r.power)', 'energy')
            .where('r.inverter_id = :inverterId', { inverterId })
            .andWhere('r.timestamp BETWEEN :startDate AND :endDate', { startDate, endDate })
            .groupBy("date(r.timestamp)")
            .orderBy('date')
            .getRawMany();
    }
}
