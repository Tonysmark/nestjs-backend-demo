import { Module } from '@nestjs/common';

import { ConfigurationModule } from './configuration/configuration.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AppFilter } from './filters/app.filter';
import { TransformInterceptor } from './interceptors/transform.interceptor';

@Module({
    imports: [DatabaseModule, ConfigurationModule, AuthModule, UserModule],
    providers: [
        { provide: APP_FILTER, useClass: AppFilter },
        { provide: APP_INTERCEPTOR, useClass: TransformInterceptor },
    ],
})
export class AppModule {}
