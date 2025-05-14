import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateInverterDto {
    @ApiProperty({ description: 'Human-readable name of the inverter' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ description: 'Model identifier of the inverter' })
    @IsString()
    @IsNotEmpty()
    model: string;

    @ApiProperty({ description: 'ID of the plant this inverter belongs to' })
    @IsNumber()
    @IsNotEmpty()
    plantId: number;
}