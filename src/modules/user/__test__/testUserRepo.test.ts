import { User } from '../user.entity';

export default test('Test user repo', async () => {
    // const userRepo = new UserRepository(dataSource.getRepository(User));

    const user = new User({ email: 'cbstorm@gmail.com', password: '123456' });
});
