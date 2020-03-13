import * as path from 'path';
export default () => ({
    port: 8080,
    sql: {
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '123456',
        database: 'nestjs_doc',
        synchronize: true,
        autoLoadEntities: true,
        entities: [path.join(__dirname, '**/*.entity{ .ts,.js}')], // TODO: 获取所有 entity
    },
    swagger: {
        enable: true,
        path: 'swagger',
    },
    jwt: {
        secret: 'secretKey',
        expiresIn: '1d',
    },
});
