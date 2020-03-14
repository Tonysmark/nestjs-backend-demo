import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserBase } from 'src/dto/user/user.base';
import { HashCode } from 'src/utils/hash-code';

import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserRepository) private userRepository: UserRepository) {}

    async createUser({ password, ...credential }) {
        const hash = await HashCode.encrypt(password);
        return this.userRepository.createUser({ password: hash, ...credential } as UserBase);
    }
}
