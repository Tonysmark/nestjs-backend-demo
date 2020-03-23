import { Injectable, Logger, UnauthorizedException, NotFoundException } from '@nestjs/common';
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
        // 1. repository 负责用户是否存在，如果用户不存在会抛出 404
        // 2. 根据 compare 计算出密码是否正确，如果不正确抛出 401 未授权
        const user = await this.userRepository.findUserByUniKey({ username });
        if (await HashCode.compare(password, user.password)) {
            Logger.log(`User: ${user.username} is verified`, 'UserService');
            return await this.authService.tokenGenerator(user);
        } else {
            throw new UnauthorizedException('密码错误');
        }
    }

    async updateUser(id, partialData) {
        // id 从payload中解出来

        return this.userRepository.updateUser(id, partialData);
    }

    async getAllUser() {
        return await this.userRepository.find();
    }
}
