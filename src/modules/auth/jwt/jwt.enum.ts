export enum JwtEnum {
    ISS = 'iss', // iss (issuer)：签发人
    EXP = 'exp', // exp (expiration time)：过期时间
    SUB = 'sub', // sub (subject)：主题
    AUD = 'aud', // aud (audience)：受众
    NBF = 'nbf', // nbf (Not Before)：生效时间
    IAT = 'iat', // iat (Issued At)：签发时间
    JTI = 'jti', // jti (JWT ID)：编号
}
