import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { PhotoModule } from './photo/photo.module';

import { ConfigurationModule } from './configuration/configuration.module';

@Module({
    imports: [DatabaseModule, PhotoModule, ConfigurationModule],
    providers: [],
})
export class AppModule {}
