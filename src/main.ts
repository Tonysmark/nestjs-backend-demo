import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

(async () => {
    // call the config file to parse variables in to nodejs process environment
    const app = await NestFactory.create(AppModule, { cors: true });
    const configService = app.get(ConfigService);
    app.setGlobalPrefix('api/v1');

    // set port
    const port = process.env.PORT || configService.get('port');

    // swagger
    const { enable, path } = configService.get('swagger');
    if (enable) {
        const swaggerOptions = new DocumentBuilder()
            .addBearerAuth()
            .setTitle('Nest后端原型')
            .setDescription('nest 快速开发框架')
            .setVersion('1.0')
            .build();
        const document = SwaggerModule.createDocument(app, swaggerOptions);
        SwaggerModule.setup(path, app, document);
        Logger.log('Swagger UI is initialized', 'Swagger');
    }
    // start
    await app.listen(port);
    Logger.log(`Service is running at ${port}`, 'Bootstrap');
    Logger.log(`Current NODE_ENV is ${process.env.NODE_ENV}`, 'Environment');

    // TODO: add additional Log file using log4js
})();
