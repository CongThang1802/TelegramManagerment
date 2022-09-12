import { DATA_SOURCE } from 'src/commonModules/database/datasource';
import { DataSource } from 'typeorm';
import { User } from './user.entity';
import { UserRepository, USER_REPOSITORY } from './user.repository';

export const UserProviders = [
    {
        provide: USER_REPOSITORY,
        useFactory: (datasource: DataSource) => {
            return new UserRepository(datasource.getRepository(User));
        },
        inject: [DATA_SOURCE],
    },
];
