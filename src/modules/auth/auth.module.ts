import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';

import { JwtProvider } from './jwt/jwt.provider';
import { JwtStrategy } from './jwt/jwt-strategy';

/**
 * Authentication 仅负责对用户登录信息验证，权限分配，JWT效验等信息安全检测
 */
@Module({
    providers: [AuthService, JwtStrategy],
    imports: [JwtModule.registerAsync({ useClass: JwtProvider })],
    exports: [AuthService],
})
export class AuthModule {}
