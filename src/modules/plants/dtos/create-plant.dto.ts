import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreatePlantDto {
  @ApiProperty({ description: 'Human-readable name of the plant' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Location of the plant' })
  @IsString()
  @IsNotEmpty()
  localization: string;
}