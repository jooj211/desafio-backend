import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsinasModule } from './modules/usinas/usinas.module';
import { InversoresModule } from './modules/inversores/inversores.module';
import { MetricasModule } from './modules/metricas/metricas.module';

@Module({
  imports: [UsinasModule, InversoresModule, MetricasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
