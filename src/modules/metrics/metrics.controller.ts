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
    DefaultValuePipe,
  } from '@nestjs/common';
  import { MetricsService } from './metrics.service';
  import { CreateReadingDto } from './dtos/create-reading.dto';
  import { UpdateReadingDto } from './dtos/update-reading.dto';
  
  @Controller('metrics')
  export class MetricsController {
    constructor(private readonly metricsService: MetricsService) {}
  
    @Get('readings')
    findAll() {
      return this.metricsService.findAll();
    }
  
    @Get('readings/:id')
    findOne(@Param('id', ParseIntPipe) id: number) {
      return this.metricsService.findOne(id);
    }
  
    @Post('readings')
    @HttpCode(HttpStatus.CREATED)
    create(@Body() dto: CreateReadingDto) {
      return this.metricsService.create(dto);
    }
  
    @Patch('readings/:id')
    update(
      @Param('id', ParseIntPipe) id: number,
      @Body() dto: UpdateReadingDto,
    ) {
      return this.metricsService.update(id, dto);
    }
  
    @Delete('readings/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id', ParseIntPipe) id: number) {
      return this.metricsService.remove(id);
    }
  }
  