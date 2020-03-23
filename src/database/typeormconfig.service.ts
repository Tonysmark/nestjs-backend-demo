import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { entities } from './models/index';
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
            entities,
            logging: true, // FIXME 临时放在这里
        } as TypeOrmModuleOptions;
    }
}
