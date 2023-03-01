import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'root',
  password: 'toor',
  database: 'currency_manager',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],
  synchronize: false,
  // synchronize: process.env.ENVIRONMENT === 'dev' ? true : false,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
