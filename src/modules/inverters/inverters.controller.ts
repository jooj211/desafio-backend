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
  import { InvertersService } from './inverters.service';
  import { CreateInverterDto } from './dtos/create-inverter.dto';
  import { UpdateInverterDto } from './dtos/update-inverter.dto';

  @Controller('inverters')
  export class InvertersController {
    constructor(private readonly invertersService: InvertersService) {}

    @Get()
    findAll() {
        return this.invertersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.invertersService.findOne(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() dto: CreateInverterDto) {
        return this.invertersService.create(dto);
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateInverterDto,
    ) {
        return this.invertersService.update(id, dto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.invertersService.remove(id);
    }
  }