export default () => ({
    port: process.env.PORT,
    secret: process.env.SECRET,
    swagger: {
        enable: false,
    },
});
