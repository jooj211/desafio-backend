import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CreatePlantDto } from './dtos/create-plant.dto';
import { UpdatePlantDto } from './dtos/update-plant.dto';
import { PlantsService } from './plants.service';

@ApiTags('plants')
@Controller('plants')
export class PlantsController {
  constructor(private readonly plantsService: PlantsService) {}

  @Post()
  @ApiBody({ type: CreatePlantDto })
  @ApiCreatedResponse({ description: 'Plant created.' })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreatePlantDto) {
    return this.plantsService.create(dto);
  }

  @Get()
  @ApiOkResponse({ description: 'List of all plants.' })
  findAll() {
    return this.plantsService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: Number, description: 'Plant ID' })
  @ApiOkResponse({ description: 'Single plant data.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.plantsService.findOne(id);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', type: Number, description: 'Plant ID' })
  @ApiBody({ type: UpdatePlantDto })
  @ApiOkResponse({ description: 'Plant updated.' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePlantDto,
  ) {
    return this.plantsService.update(id, dto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: Number, description: 'Plant ID' })
  @ApiNoContentResponse({ description: 'Plant deleted.' })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.plantsService.remove(id);
  }
}
