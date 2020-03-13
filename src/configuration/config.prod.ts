// 生产环境，敏感信息放在 process.env 对象中

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
    },
    swagger: {
        enable: false,
    },
    jwt: {
        secret: 'secretKey',
        expiresIn: '1d',
    },
});
