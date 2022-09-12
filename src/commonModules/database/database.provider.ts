import { dataSource, DATA_SOURCE } from './datasource';

export const databaseProviders = [
    {
        provide: DATA_SOURCE,
        useFactory: async () => {
            return await dataSource.initialize();
        },
    },
];
