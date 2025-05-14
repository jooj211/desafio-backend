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
import {
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNoContentResponse,
  ApiParam,
  ApiBody,
  ApiQuery,
} from '@nestjs/swagger';
import { MetricsService } from './metrics.service';
import { CreateReadingDto } from './dtos/create-reading.dto';
import { UpdateReadingDto } from './dtos/update-reading.dto';

@ApiTags('metrics')
@Controller('metrics')
export class MetricsController {
  constructor(private readonly metricsService: MetricsService) {}

  // --- CRUD for readings ---
  @Post('readings')
  @ApiBody({ type: CreateReadingDto })
  @ApiCreatedResponse({ description: 'Reading created.' })
  @HttpCode(HttpStatus.CREATED)
  createReading(@Body() dto: CreateReadingDto) {
    return this.metricsService.create(dto);
  }

  @Get('readings')
  @ApiOkResponse({ description: 'List of all readings.' })
  findAllReadings() {
    return this.metricsService.findAll();
  }

  @Get('readings/:id')
  @ApiParam({ name: 'id', type: Number, description: 'Reading ID' })
  @ApiOkResponse({ description: 'Single reading data.' })
  findOneReading(@Param('id', ParseIntPipe) id: number) {
    return this.metricsService.findOne(id);
  }

  @Patch('readings/:id')
  @ApiParam({ name: 'id', type: Number, description: 'Reading ID' })
  @ApiBody({ type: UpdateReadingDto })
  @ApiOkResponse({ description: 'Reading updated.' })
  updateReading(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateReadingDto,
  ) {
    return this.metricsService.update(id, dto);
  }

  @Delete('readings/:id')
  @ApiParam({ name: 'id', type: Number, description: 'Reading ID' })
  @ApiNoContentResponse({ description: 'Reading deleted.' })
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteReading(@Param('id', ParseIntPipe) id: number) {
    return this.metricsService.remove(id);
  }

  // --- Aggregations ---
  @Get('max-power')
  @ApiQuery({ name: 'inverter_id', type: Number })
  @ApiQuery({ name: 'start_date', type: String })
  @ApiQuery({ name: 'end_date', type: String })
  @ApiOkResponse({ description: 'Max power per day for an inverter.' })
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
  @ApiQuery({ name: 'inverter_id', type: Number })
  @ApiQuery({ name: 'start_date', type: String })
  @ApiQuery({ name: 'end_date', type: String })
  @ApiOkResponse({ description: 'Average temperature per day for an inverter.' })
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
  @ApiQuery({ name: 'plant_id', type: Number })
  @ApiQuery({ name: 'start_date', type: String })
  @ApiQuery({ name: 'end_date', type: String })
  @ApiOkResponse({ description: 'Energy generation per plant per day.' })
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
  @ApiQuery({ name: 'inverter_id', type: Number })
  @ApiQuery({ name: 'start_date', type: String })
  @ApiQuery({ name: 'end_date', type: String })
  @ApiOkResponse({ description: 'Energy generation per inverter per day.' })
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