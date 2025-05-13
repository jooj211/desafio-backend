import { Module } from '@nestjs/common';
import { InvertersController } from './inverters.controller';
import { InvertersService } from './inverters.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plant } from '../plants/entities/plant.entity';
import { Inverter } from './entities/inverter.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Plant]),
    TypeOrmModule.forFeature([Inverter])
  ],
  controllers: [InvertersController],
  providers: [InvertersService]
})
export class InvertersModule {}
