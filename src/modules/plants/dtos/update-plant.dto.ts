import { PartialType } from '@nestjs/mapped-types';
import { CreatePlantDto } from './create-plant.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdatePlantDto extends PartialType(CreatePlantDto) {
    @ApiPropertyOptional({ description: 'Updated name of the plant' })
    @IsString()
    @IsOptional()
    name?: string;

    @ApiPropertyOptional({ description: 'Updated localization of the plant' })
    @IsString()
    @IsOptional()
    localization?: string;
}
