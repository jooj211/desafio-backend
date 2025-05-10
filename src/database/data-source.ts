import 'dotenv/config'

import { DataSource } from 'typeorm';
import { Usina } from 'src/modules/usinas/entities/usina.entity/usina.entity';
import { Inversor } from 'src/modules/inversores/entities/inversor.entity/inversor.entity';
import { Leitura } from 'src/modules/metricas/entities/leitura.entity/leitura.entity';

export const AppDataSource = new DataSource({
    type: 'sqlite',
    database: 'database.sqlite',
    entities: [Usina, Inversor, Leitura],
    migrations: ['dist/database/migrations/*.js'],
  });
