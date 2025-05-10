import 'dotenv/config';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usina } from 'src/modules/usinas/entities/usina.entity/usina.entity';
import { Inversor } from 'src/modules/inversores/entities/inversor.entity/inversor.entity';
import { Leitura } from 'src/modules/metricas/entities/leitura.entity/leitura.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT!, 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [Usina, Inversor, Leitura],
      synchronize: false, // use migrations em dev
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
