import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateReadingDto {
    @ApiProperty({ description: 'ISO‐8601 timestamp of the reading' })
    @IsISO8601()
    @IsNotEmpty()
    timestamp: Date;

    @ApiProperty({ description: 'Active power in Watts' })
    @IsNumber()
    power: number;

    @ApiProperty({ description: 'Temperature in Celsius' })
    @IsNumber()
    temperature: number;

    @ApiProperty({ description: 'ID of the inverter that produced this reading' })
    @IsNumber()
    inverterId: number;
}