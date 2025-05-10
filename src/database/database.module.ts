import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Usina } from "src/modules/usinas/entities/usina.entity/usina.entity";
import { Inversor } from "src/modules/inversores/entities/inversor.entity/inversor.entity";
import { Leitura } from "src/modules/metricas/entities/leitura.entity/leitura.entity";


@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432, 
            username: 'postgres',
            password: 'senha',
            database: 'banco', 
            entities: [Usina, Inversor, Leitura],
            synchronize: true,
        }),
        TypeOrmModule.forFeature([Usina, Inversor, Leitura])
    ],
})

export class AppModule {}
