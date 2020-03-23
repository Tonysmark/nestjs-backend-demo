import { ConflictException, NotFoundException } from '@nestjs/common';

import { Repository, EntityRepository } from 'typeorm';

import { User } from 'src/database/models/user.entity';
import { UserBase } from 'src/dto/user/user.base';
/**
 *
 *
 * @export
 * @class UserRepository
 * @extends {Repository<User>}
 * @note id username email 都是唯一的
 * @note 根据 SOLID 原则重构这部分代码，并且把修改密码分离出来
 */
@EntityRepository(User)
export class UserRepository extends Repository<User> {
    constructor() {
        super();
    }
    async createUser(user: UserBase) {
        try {
            return await this.save(user);
        } catch (error) {
            throw new ConflictException('用户已经存在');
        }
    }

    async findUserByUniKey(identifier: { username?: string; email?: string; id?: string }): Promise<User> {
        const user = await this.createQueryBuilder()
            .where('user.username', { username: identifier['username'] })
            .orWhere('user.email', { email: identifier['email'] })
            .orWhere('user.id', { id: identifier['id'] })
            .getOne();
        if (user) {
            return user;
        } else {
            throw new NotFoundException('用户不存在');
        }
    }

    async updateUser(id, partial) {
        return await this.update(id, partial);
    }
}
