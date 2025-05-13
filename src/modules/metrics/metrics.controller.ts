import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { MetricsService } from './metrics.service';
import { CreateReadingDto } from './dtos/create-reading.dto';
import { UpdateReadingDto } from './dtos/update-reading.dto';

@Controller('metrics')
export class MetricsController {
  constructor(private readonly metricsService: MetricsService) {}

  // CRUD for readings
  @Get('readings')
  getAllReadings() {
    return this.metricsService.findAll();
  }

  @Get('readings/:id')
  getReadingById(@Param('id', ParseIntPipe) id: number) {
    return this.metricsService.findOne(id);
  }

  @Post('readings')
  @HttpCode(HttpStatus.CREATED)
  createReading(@Body() dto: CreateReadingDto) {
    return this.metricsService.create(dto);
  }

  @Patch('readings/:id')
  updateReading(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateReadingDto,
  ) {
    return this.metricsService.update(id, dto);
  }

  @Delete('readings/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteReading(@Param('id', ParseIntPipe) id: number) {
    return this.metricsService.remove(id);
  }

  // Aggregations using English snake_case query params
  @Get('max-power')
  getMaxPower(
    @Query('inverter_id', ParseIntPipe) inverterId: number,
    @Query('start_date') startDate: string,
    @Query('end_date') endDate: string,
  ) {
    return this.metricsService.getMaxPower(
      inverterId,
      new Date(startDate),
      new Date(endDate),
    );
  }

  @Get('avg-temperature')
  getAverageTemperature(
    @Query('inverter_id', ParseIntPipe) inverterId: number,
    @Query('start_date') startDate: string,
    @Query('end_date') endDate: string,
  ) {
    return this.metricsService.getAverageTemperature(
      inverterId,
      new Date(startDate),
      new Date(endDate),
    );
  }

  @Get('generation/plant')
  getGenerationByPlant(
    @Query('plant_id', ParseIntPipe) plantId: number,
    @Query('start_date') startDate: string,
    @Query('end_date') endDate: string,
  ) {
    return this.metricsService.getGenerationByPlant(
      plantId,
      new Date(startDate),
      new Date(endDate),
    );
  }

  @Get('generation/inverter')
  getGenerationByInverter(
    @Query('inverter_id', ParseIntPipe) inverterId: number,
    @Query('start_date') startDate: string,
    @Query('end_date') endDate: string,
  ) {
    return this.metricsService.getGenerationByInverter(
      inverterId,
      new Date(startDate),
      new Date(endDate),
    );
  }
}
