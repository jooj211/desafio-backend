
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inverter } from '../modules/inverters/entities/inverter.entity';
import { Reading } from '../modules/metrics/entities/reading.entity';
import { Plant } from '../modules/plants/entities/plant.entity';

const isTest = process.env.NODE_ENV === 'test';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: isTest ? ':memory:' : 'database.sqlite',
      dropSchema: isTest,
      synchronize: isTest,
      migrationsRun: !isTest,
      migrations: ['dist/database/migrations/**/*.js'],
      entities: [Plant, Inverter, Reading],
      logging: !isTest,
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
