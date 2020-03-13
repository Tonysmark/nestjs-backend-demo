import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as path from 'path';

(async () => {
    // call the config file to parse variables in to nodejs process environment
    const app = await NestFactory.create(AppModule, { cors: true });
    app.setGlobalPrefix('api/v1');
    const configService = app.get(ConfigService);
    // set port
    const port = process.env.PORT || configService.get('port');

    // start
    await app.listen(port);
    Logger.log(`Service is running at ${port}`, 'Bootstrap');
    Logger.log(`Current NODE_ENV is ${process.env.NODE_ENV}`, 'Environment');

    // TODO: add additional Log file using log4js
})();
