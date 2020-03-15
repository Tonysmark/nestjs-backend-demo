import { Injectable } from '@nestjs/common';
import { JwtOptionsFactory, JwtModuleOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtProvider implements JwtOptionsFactory {
    constructor(private readonly configService: ConfigService) {}
    /**
     * Signature
     * HMACSHA256( base64UrlEncode(header) +"." + base64UrlEncode(payload) , secret)
     */
    createJwtOptions(): JwtModuleOptions {
        const { secret, expiresIn } = this.configService.get('jwt');
        // TODO: 生成Signature
        return {
            secret,
            signOptions: { issuer: 'NestJS', expiresIn, algorithm: 'HS512' },
        };
    }
}
