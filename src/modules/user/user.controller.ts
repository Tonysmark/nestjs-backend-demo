import { Controller, Post, Body, Get, UseGuards, Request, Param, Patch, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { UserBase } from 'src/dto/user/user.base';
import { SigninRequest } from 'src/dto/auth/signin.request';

import { AuthService } from '../auth/auth.service';

import { UserService } from './user.service';

// 登录 查无此人 => 返回用户不存在错误
@ApiTags('用户')
@Controller('users')
export class UserController {
    constructor(private userService: UserService, private authService: AuthService) {}

    @ApiOperation({ summary: '用户注册' })
    @Post('register')
    register(@Body() user: UserBase) {
        return this.userService.createUser(user);
    }

    @ApiOperation({ summary: '用户登录' })
    @Post('signin')
    signIn(@Body() user: SigninRequest) {
        return this.userService.validateUser(user);
    }

    @ApiOperation({ summary: '修改用户信息', parameters: [{ in: 'path', name: 'id' }] })
    @Put(':id')
    updateUser(@Param() id: string, @Body() user: UserBase) {
        return this.userService.updateUser(id, user);
    }

    // @ApiOperation({ summary: '获取所有用户' })
    // @Get()
    // allUsers() {
    //     return this.userService.getAllUser();
    // }

    // @ApiOperation({ summary: '获取某一用户' })
    // @Get(':username')
    // currentUser(@Param('username') username: string) {
    //     return true;
    // }
}
