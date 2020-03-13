import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { UserBase } from 'src/dto/user/user.base';
import { UserService } from './user.service';

// 登录 查无此人 => 返回用户不存在错误
@ApiTags('用户')
@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}
    @ApiOperation({ summary: '添加用户' })
    @Post()
    createUser(@Body() user: UserBase) {
        return this.userService.createUser(user);
    }
}
