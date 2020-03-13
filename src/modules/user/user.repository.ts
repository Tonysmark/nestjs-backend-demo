import { ConflictException } from '@nestjs/common';

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
}
