import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    // 1. 从你的请求头中抽出了 Token 本体 Bearer 后面的东西
    // 2. QUES： 拿着你的密钥干啥了, 密钥正确能得到payload, 否则返回401
    // 3. 抽出 payload 中的数据

    constructor(configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('jwt.secret'),
        } as StrategyOptions);
    }

    async validate(payload): Promise<any> {
        Logger.debug(`payload ${JSON.stringify(payload)}`, 'JwtStrategy');
        // 下面这个东西最终会被包裹在user对象中 user:{}
        return { id: payload.sub };
        // const user = await this.authService.validateUser(username, password);
        // if (!user) {
        //     throw new UnauthorizedException();
        // }
        // return user;
    }
}
