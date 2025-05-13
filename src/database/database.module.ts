import 'dotenv/config';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plant } from 'src/modules/plants/entities/plant.entity';
import { Inverter } from 'src/modules/inverters/entities/inverter.entity';
import { Reading } from 'src/modules/metrics/entities/reading.entity';


@Module({
    imports: [
      TypeOrmModule.forRoot({
        type: 'sqlite',
        database: 'database.sqlite',
        entities: [Plant, Inverter, Reading],
        synchronize: false,
      }),
    ],
  })
  export class DatabaseModule {}
