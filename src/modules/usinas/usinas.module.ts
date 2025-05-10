import { Module } from '@nestjs/common';
import { UsinasController } from './usinas.controller';
import { UsinasService } from './usinas.service';

@Module({
  controllers: [UsinasController],
  providers: [UsinasService]
})
export class UsinasModule {}
