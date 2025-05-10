import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UsinasModule } from './modules/usinas/usinas.module';
import { InversoresModule } from './modules/inversores/inversores.module';
import { MetricasModule } from './modules/metricas/metricas.module';

@Module({
  imports: [
    DatabaseModule,
    UsinasModule,
    InversoresModule,
    MetricasModule
  ],
})
export class AppModule {}