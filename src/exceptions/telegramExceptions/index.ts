import { TelegramConnectException } from './connectException';

export class TelegramException {
    static ConnectionException(message?: string) {
        return new TelegramConnectException(message);
    }
}
