import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import config from './environment/config';
import { MODULOS_AGENDADOR_CITAS } from './common/constantes/modulos-agendador-citas';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
    ...MODULOS_AGENDADOR_CITAS,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
