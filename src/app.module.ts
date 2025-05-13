import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { InvertersModule } from './modules/inverters/inverters.module';
import { MetricsModule } from './modules/metrics/metrics.module';
import { PlantsModule } from './modules/plants/plants.module';

@Module({
  imports: [
    DatabaseModule,
    PlantsModule,
    InvertersModule,
    MetricsModule,
  ],
})
export class AppModule {}
