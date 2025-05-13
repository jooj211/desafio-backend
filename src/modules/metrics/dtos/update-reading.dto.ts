import { CreateReadingDto } from "./create-reading.dto";
import { PartialType } from "@nestjs/mapped-types";

export class UpdateReadingDto extends PartialType(CreateReadingDto) {}