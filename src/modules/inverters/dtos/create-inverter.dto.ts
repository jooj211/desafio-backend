import { IsString, IsNotEmpty, IsInt } from "class-validator";

export class CreateInverterDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    model: string;

    @IsInt()
    plantId: number;
}