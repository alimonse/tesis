import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigType } from '@nestjs/config';
import { Global, Module } from '@nestjs/common';
import config from '../environment/config';
import { ENTIDADES_AGENDADOR_CITAS } from '../common/constantes/entidades-agendador-citas';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (_configService: ConfigType<typeof config>) => {
        const { host, port, database, synchronize, dropSchema,username,password } =
          _configService.database.mysql;

        const typeorm_config: TypeOrmModuleOptions = {
          type: 'mysql',
          host,
          port,
          username,
          password,
          database,
          synchronize,
          dropSchema,
          entities: ENTIDADES_AGENDADOR_CITAS,
          // extra: {
          //   trustServerCertificate: true,
          // },
        };
        return typeorm_config;
      },
      inject: [config.KEY],
    }),
  ],
})
export class DatabaseModule {}
