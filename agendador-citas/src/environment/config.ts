import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  console.log('aqhi');

  return {
    port: process.env.PORT,
    database: {
      mysql: {
        host: process.env.DATABASE_HOST,
        port: +process.env.DATABASE_PORT,
        database: process.env.DATABASE_NAME,
        synchronize: JSON.parse(process.env.DATABASE_SYNCHRONIZE),
        dropSchema: JSON.parse(process.env.DATABASE_DROPSCHEMA),
        password: process.env.DATABASE_PASSWORD,
        username: process.env.DATABASE_USERNAME
      },
    },
    jwt: {
      secret: process.env.JWT_SECRET,
    },
  };
});
