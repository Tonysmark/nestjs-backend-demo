import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserBase } from 'src/dto/user/user.base';
import { HashCode } from 'src/utils/hash-code';

import { AuthService } from '../auth/auth.service';

import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
    constructor(
        /* 注入啥  叫啥  啥类型 */
        @InjectRepository(UserRepository) private userRepository: UserRepository,
        private readonly authService: AuthService,
    ) {}

    async createUser({ password, ...credential }) {
        const hash = await HashCode.encrypt(password);
        return this.userRepository.createUser({ password: hash, ...credential } as UserBase);
    }

    async validateUser({ username, password }) {
        // 先找用户是否存在
        const user = await this.userRepository.findOne({ username });
        if (user && (await HashCode.compare(password, user.password))) {
            Logger.log(`User: ${user.username} is verified`, 'UserService');
            //    调用JWTService生成payload
            return await this.authService.authenticateUser(user);
        } else {
            throw new UnauthorizedException();
        }
    }

    async test({ id }) {
        return await this.userRepository.findOne(id);
    }
}
