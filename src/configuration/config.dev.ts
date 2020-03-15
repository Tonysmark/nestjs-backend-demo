// dev 模式 按照实际开发修改以下内容
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
        enable: true,
        path: 'swagger',
    },
    jwt: {
        secret: 'key in the development is use less',
        expiresIn: '1d',
    },
});
