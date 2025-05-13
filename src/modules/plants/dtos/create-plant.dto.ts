import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePlantDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  localization?: string;
}