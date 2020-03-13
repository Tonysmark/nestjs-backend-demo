import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TypeormConfigService implements TypeOrmOptionsFactory {
    constructor(private configService: ConfigService) {}
    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: this.configService.get('sql.type'),
            host: this.configService.get('sql.host'),
            port: this.configService.get('sql.port'),
            username: this.configService.get('sql.username'),
            password: this.configService.get('sql.password'),
            database: this.configService.get('sql.database'),
            synchronize: this.configService.get('sql.synchronize'),
            autoLoadEntities: this.configService.get('sql.autoLoadEntities'),
            entities: this.configService.get('sql.entities'),
        } as TypeOrmModuleOptions;
    }
}
