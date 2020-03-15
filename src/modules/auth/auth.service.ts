import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) {}

    async authenticateUser({ id }) {
        // 此时用户已被证实, 返回用户 token 数据
        const payload = { sub: id };
        const token = await this.jwtService.sign(payload);
        Logger.debug(this.jwtService.decode(token), 'AuthService');
        return {
            access_token: token,
        };
    }
}
