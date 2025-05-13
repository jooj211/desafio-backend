import { Module } from '@nestjs/common';
import { MetricsController } from './metrics.controller';
import { MetricsService } from './metrics.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reading } from './entities/reading.entity';
import { Inverter } from '../inverters/entities/inverter.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reading]),
    TypeOrmModule.forFeature([Inverter]),
  ],
  controllers: [MetricsController],
  providers: [MetricsService]
})
export class MetricsModule {}
