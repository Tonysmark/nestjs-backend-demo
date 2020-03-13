import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';

/**
 * Authentication 仅负责对用户登录信息验证，权限分配，JWT效验等信息安全检测
 */
@Module({
  providers: [AuthService]
})
export class AuthModule {}
