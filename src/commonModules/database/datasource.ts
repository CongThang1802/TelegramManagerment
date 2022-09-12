import { DataSource } from 'typeorm';
import { AppConfigKey } from '../appConfig/appConfig.const';
import { configFactory } from '../appConfig/configFactory';

const configuration = configFactory();

export const DATA_SOURCE = 'DATA_SOURCE';

export const dataSource = new DataSource({
    type: 'mysql',
    host: configuration.get<string>(AppConfigKey.DB_HOST),
    port: configuration.get<number>(AppConfigKey.DB_PORT),
    username: configuration.get<string>(AppConfigKey.DB_USERNAME),
    password: configuration.get<string>(AppConfigKey.DB_PASSWORD),
    database: configuration.get<string>(AppConfigKey.DB_NAME),
    entities: [__dirname + '/../../modules/**/*.entity.js'],
    synchronize: false,
    logging: ['error'],
    migrations: [__dirname + '/../../../database-migrations/*{.ts,.js}'],
});
