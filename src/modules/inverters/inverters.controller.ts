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
import { ApiBody, ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateInverterDto } from './dtos/create-inverter.dto';
import { UpdateInverterDto } from './dtos/update-inverter.dto';
import { InvertersService } from './inverters.service';
    
@ApiTags('inverters')
@Controller('inverters')
export class InvertersController {
    constructor(private readonly invertersService: InvertersService) {}

    @Post()
    @ApiBody({ type: CreateInverterDto })
    @ApiCreatedResponse({ description: 'The inverter has been created.' })
    @HttpCode(HttpStatus.CREATED)
    create(@Body() dto: CreateInverterDto) {
    return this.invertersService.create(dto);
    }

    @Get()
    @ApiOkResponse({ description: 'List of all inverters.' })
    findAll() {
    return this.invertersService.findAll();
    }

    @Get(':id')
    @ApiParam({ name: 'id', type: Number, description: 'ID of the inverter' })
    @ApiOkResponse({ description: 'The inverter data.' })
    findOne(@Param('id', ParseIntPipe) id: number) {
    return this.invertersService.findOne(id);
    }

    @Patch(':id')
    @ApiParam({ name: 'id', type: Number, description: 'ID of the inverter' })
    @ApiBody({ type: UpdateInverterDto })
    @ApiOkResponse({ description: 'The inverter has been updated.' })
    update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateInverterDto,
    ) {
    return this.invertersService.update(id, dto);
    }

    @Delete(':id')
    @ApiParam({ name: 'id', type: Number, description: 'ID of the inverter' })
    @ApiNoContentResponse({ description: 'The inverter has been deleted.' })
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id', ParseIntPipe) id: number) {
    return this.invertersService.remove(id);
    }
}