import { Module } from '@nestjs/common';
import { MetricasController } from './metricas.controller';
import { MetricasService } from './metricas.service';

@Module({
  controllers: [MetricasController],
  providers: [MetricasService]
})
export class MetricasModule {}
