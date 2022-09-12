import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { AppConfigKey } from './../appConfig/appConfig.const';

@Injectable()
export class TokenService {
    constructor(private configuration: ConfigService) {}
    async sign(payload: any, expiresIn: number): Promise<string> {
        return new Promise((resolve, reject) => {
            jwt.sign(
                payload,
                this.configuration.get<string>(AppConfigKey.SECRET_KEY),
                {
                    issuer: this.configuration.get<string>(
                        AppConfigKey.PROJECT_NAME
                    ),
                    expiresIn: expiresIn,
                },
                (err, encoded) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(encoded);
                    }
                }
            );
        });
    }
    async verify(token: string) {
        return new Promise((resolve, reject) => {
            jwt.verify(
                token,
                this.configuration.get(AppConfigKey.SECRET_KEY),
                (err, decoded) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(decoded);
                    }
                }
            );
        });
    }
}
