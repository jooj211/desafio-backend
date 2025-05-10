import 'dotenv/config'

import { DataSource } from 'typeorm';
import { Usina } from 'src/modules/usinas/entities/usina.entity/usina.entity';
import { Inversor } from 'src/modules/inversores/entities/inversor.entity/inversor.entity';
import { Leitura } from 'src/modules/metricas/entities/leitura.entity/leitura.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT!, 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [Usina, Inversor, Leitura],
  migrations: ['dist/database/migrations/*.js'],
});
