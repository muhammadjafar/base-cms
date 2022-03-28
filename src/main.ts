import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from './config';
import {
    initializeTransactionalContext,
    patchTypeORMRepositoryWithBaseRepository,
} from 'typeorm-transactional-cls-hooked';
import { Logger } from '@nestjs/common';

async function bootstrap() {
    // Sentry
    // Sentry.init({
    //     dsn: config.sentry.dsn,
    //     attachStacktrace: true,
    //     debug: config.nodeEnv !== 'local',
    //     environment: config.nodeEnv,
    // });

    initializeTransactionalContext();
    patchTypeORMRepositoryWithBaseRepository();

    const app = await NestFactory.create(AppModule);

    app.enableCors();
    const port: string = config.port;
    await app.listen(port);
    Logger.log(`Application running on port ${port}`, 'NestApplication');
}
bootstrap();
