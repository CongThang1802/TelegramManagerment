export class TelegramConnectException extends Error {
    constructor(message: string = 'telegram-connection-fail') {
        super(message);
    }
}
