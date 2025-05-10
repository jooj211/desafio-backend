import { Module } from '@nestjs/common';
import { InversoresController } from './inversores.controller';
import { InversoresService } from './inversores.service';

@Module({
  controllers: [InversoresController],
  providers: [InversoresService]
})
export class InversoresModule {}
