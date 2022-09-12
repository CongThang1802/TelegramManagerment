import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
export function configFactory() {
    config();
    const configuration = new ConfigService();
    return configuration;
}
