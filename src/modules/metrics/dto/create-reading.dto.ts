import { IsNotEmpty, IsInt, IsDate, IsNumber } from "class-validator";

export class CreateReadingDto {
    @IsDate()
    @IsNotEmpty()
    timestamp: Date;

    @IsNumber()
    @IsNotEmpty()
    power: number;

    @IsNumber()
    @IsNotEmpty()
    temperature: number;

    @IsInt()
    inverterId: number;
}