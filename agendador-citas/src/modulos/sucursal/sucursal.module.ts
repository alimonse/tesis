import { Module } from '@nestjs/common';
import { SucursalService } from './sucursal.service';
import { SucursalController } from './sucursal.controller';

@Module({
  providers: [SucursalService],
  controllers: [SucursalController]
})
export class SucursalModule {}
