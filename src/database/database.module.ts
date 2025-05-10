import 'dotenv/config';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usina } from 'src/modules/usinas/entities/usina.entity/usina.entity';
import { Inversor } from 'src/modules/inversores/entities/inversor.entity/inversor.entity';
import { Leitura } from 'src/modules/metricas/entities/leitura.entity/leitura.entity';


@Module({
    imports: [
      TypeOrmModule.forRoot({
        type: 'sqlite',
        database: 'database.sqlite',
        entities: [Usina, Inversor, Leitura],
        synchronize: false,
      }),
    ],
  })
  export class DatabaseModule {}
