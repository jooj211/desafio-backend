import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsISO8601, IsNumber, IsOptional } from 'class-validator';
import { CreateReadingDto } from './create-reading.dto';

export class UpdateReadingDto extends PartialType(CreateReadingDto) {
    @ApiPropertyOptional({ description: 'New ISO‐8601 timestamp' })
    @IsISO8601()
    @IsOptional()
    timestamp?: Date;

    @ApiPropertyOptional({ description: 'New active power in Watts' })
    @IsNumber()
    @IsOptional()
    power?: number;

    @ApiPropertyOptional({ description: 'New temperature in Celsius' })
    @IsNumber()
    @IsOptional()
    temperature?: number;

    @ApiPropertyOptional({ description: 'New inverter ID' })
    @IsNumber()
    @IsOptional()
    inverterId?: number;
}