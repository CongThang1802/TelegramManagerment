import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as EventEmitter from 'events';
import { TelegramClient } from 'telegram';
import { StringSession } from 'telegram/sessions';
import { AppConfigKey } from '../appConfig/appConfig.const';
import { TelegramException } from './../../exceptions/telegramExceptions/index';

@Injectable()
export class TelegramService {
    phoneCodeEvent: EventEmitter;
    constructor(private readonly configuration: ConfigService) {
        this.phoneCodeEvent = new EventEmitter();
    }

    async connectWithSession(
        apiId: number,
        apiHash: string,
        session: string
    ): Promise<TelegramClient> {
        const stringSession = new StringSession(session);
        const client = new TelegramClient(stringSession, apiId, apiHash, {
            connectionRetries: 10,
        });
        await client.connect();
        return client;
    }

    async connect(
        apiId: number,
        apiHash: string,
        phoneNumber: string
    ): Promise<string> {
        try {
            const stringSession = new StringSession('');
            const client = new TelegramClient(stringSession, apiId, apiHash, {
                connectionRetries: 10,
            });
            if (
                this.configuration.get(AppConfigKey.NODE_ENV) == 'development'
            ) {
                this.setForDevelopmentEnvironment(client);
            }
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    client
                        .start({
                            phoneNumber,
                            phoneCode: async () => {
                                return await this.waitForPhoneCode(phoneNumber);
                            },
                            onError: (err) => {
                                if (err) {
                                    reject(err);
                                }
                            },
                        })
                        .then(() => {
                            resolve(stringSession.save());
                        });
                }, 500);
            });
        } catch (error) {
            console.log(error);
            throw TelegramException.ConnectionException();
        }
    }
    async waitForPhoneCode(phoneNumber: string): Promise<string> {
        return new Promise((resolve, reject) => {
            this.phoneCodeEvent.on(phoneNumber, (code) => {
                resolve(code);
            });
        });
    }
    emitPhoneCode(phoneNumber: string, phoneCode: string) {
        this.phoneCodeEvent.emit(phoneNumber, phoneCode);
        return;
    }

    setForDevelopmentEnvironment(client: TelegramClient) {
        client.session.setDC(
            this.configuration.get(AppConfigKey.TEST_DC),
            this.configuration.get(AppConfigKey.TEST_IP),
            this.configuration.get(AppConfigKey.TEST_PORT)
        );
    }
}
