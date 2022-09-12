import { DATA_SOURCE } from 'src/commonModules/database/datasource';
import { DataSource } from 'typeorm';
import { Account } from './account.entity';
import { AccountRepository } from './account.repository';

export const ACCOUNT_REPOSITORY = 'ACCOUNT_REPOSITORY';

export const AccountProviders = [
    {
        provide: ACCOUNT_REPOSITORY,
        useFactory: (datasource: DataSource) => {
            return new AccountRepository(datasource.getRepository(Account));
        },
        inject: [DATA_SOURCE],
    },
];
