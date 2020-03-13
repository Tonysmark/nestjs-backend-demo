import { Module } from '@nestjs/common';

import { ConfigurationModule } from './configuration/configuration.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';

@Module({
    imports: [DatabaseModule, ConfigurationModule, AuthModule, UserModule],
    providers: [],
})
export class AppModule {}
