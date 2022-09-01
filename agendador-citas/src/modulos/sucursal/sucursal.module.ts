import { Module } from '@nestjs/common';
import { SucursalService } from './sucursal.service';
import { SucursalController } from './sucursal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SucursalEntity } from './sucursal.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SucursalEntity], 'default')],
  providers: [SucursalService],
  controllers: [SucursalController],
  exports: [SucursalService],
})
export class SucursalModule {}
