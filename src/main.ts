import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from "helmet";
import { AppModule } from './app.module';
import { AppConfigKey } from './commonModules/appConfig/appConfig.const';
import { HttpExceptionFilter } from './exceptions/httpException';

(async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(helmet());
    const configService = app.get(ConfigService);
    app.useGlobalFilters(new HttpExceptionFilter());
    const config = new DocumentBuilder()
        .setTitle(configService.get(AppConfigKey.PROJECT_NAME))
        .setDescription(configService.get(AppConfigKey.PROJECT_NAME))
        .setVersion('1.0')
        .addTag(configService.get(AppConfigKey.PROJECT_NAME))
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);
    await app.listen(configService.get<number>(AppConfigKey.APP_PORT) || 3000);
})();
