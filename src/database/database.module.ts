import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TypeormConfigService } from './typeormconfig.service';

@Module({
    providers: [TypeormConfigService],
    exports: [],
    imports: [ConfigModule, TypeOrmModule.forRootAsync({ useClass: TypeormConfigService })],
})
export class DatabaseModule {}
