import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// 判定环境，把不同的环境配置文件放到 alterConfig 里
const env = process.env.NODE_ENV;
import * as fs from 'fs';

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
    imports: [ConfigModule.forRoot({ isGlobal: true, load: [alterConfig] })],
})
export class ConfigurationModule {}
