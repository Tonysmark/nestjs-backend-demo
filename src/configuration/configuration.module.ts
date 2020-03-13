import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import * as fs from 'fs';
const env = process.env.NODE_ENV;
let alterConfig = () => ({});
// NOTE: 切记 NODE_ENV=dev 后面别跟空格
const files = fs.readdirSync('./src/configuration');
for (const file of files) {
    if (files.indexOf(`config.${env}.ts`) > -1) {
        alterConfig = require(`./${file}`).default;
        break;
    }
}

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [alterConfig],
        }),
    ],
})
export class ConfigurationModule {}
