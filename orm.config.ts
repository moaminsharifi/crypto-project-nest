import { TypeOrmModule } from '@nestjs/typeorm';

export const ormConfig: TypeOrmModule = {
  type: process.env.DB_TYPE || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'toor',
  database: process.env.DB_NAME || 'currency_manager',
  entities: [],
  synchronize: false,
};
