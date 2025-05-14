
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inverter } from '../modules/inverters/entities/inverter.entity';
import { Reading } from '../modules/metrics/entities/reading.entity';
import { Plant } from '../modules/plants/entities/plant.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      dropSchema: false,
      synchronize: false,
      migrationsRun: !false,
      migrations: ['dist/database/migrations/**/*.js'],
      entities: [Plant, Inverter, Reading],
      logging: false,
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
