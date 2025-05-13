import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Param,
    Body,
    HttpCode,
    HttpStatus,
    ParseIntPipe,
  } from '@nestjs/common';
  import { PlantsService } from './plants.service';
  import { CreatePlantDto } from './dtos/create-plant.dto';
  import { UpdatePlantDto } from './dtos/update-plant.dto';
  
  @Controller('plants')
  export class PlantsController {
    constructor(private readonly plantsService: PlantsService) {}
  
    @Get()
    findAll() {
      return this.plantsService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
      return this.plantsService.findOne(id);
    }
  
    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() dto: CreatePlantDto) {
      return this.plantsService.create(dto);
    }
  
    @Patch(':id')
    update(
      @Param('id', ParseIntPipe) id: number,
      @Body() dto: UpdatePlantDto,
    ) {
      return this.plantsService.update(id, dto);
    }
  
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id', ParseIntPipe) id: number) {
      return this.plantsService.remove(id);
    }
  }
  