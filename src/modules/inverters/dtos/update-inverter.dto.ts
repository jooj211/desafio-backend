import { PartialType } from '@nestjs/mapped-types';
import { CreateInverterDto } from './create-inverter.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber } from 'class-validator';

export class UpdateInverterDto extends PartialType(CreateInverterDto) {
    @ApiPropertyOptional({ description: 'New human-readable name' })
    @IsString()
    @IsOptional()
    name?: string;

    @ApiPropertyOptional({ description: 'New model identifier' })
    @IsString()
    @IsOptional()
    model?: string;

    @ApiPropertyOptional({ description: 'New plant ID' })
    @IsNumber()
    @IsOptional()
    plantId?: number;
}