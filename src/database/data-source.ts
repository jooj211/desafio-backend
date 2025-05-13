import 'dotenv/config'

import { DataSource } from 'typeorm';
import { Plant } from 'src/modules/plants/entities/plant.entity';
import { Inverter } from 'src/modules/inverters/entities/inverter.entity';
import { Reading } from 'src/modules/metrics/entities/reading.entity';

export const AppDataSource = new DataSource({
    type: 'sqlite',
    database: 'database.sqlite',
    entities: [Plant, Inverter, Reading],
    migrations: ['dist/database/migrations/*.js'],
  });
