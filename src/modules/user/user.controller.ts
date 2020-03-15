import { Controller, Post, Body, Get, UseGuards, Request, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { UserBase } from 'src/dto/user/user.base';
import { UserService } from './user.service';
import { SigninRequest } from 'src/dto/auth/signin.request';
import { of } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';

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

    @ApiOperation({ summary: '获取所有用户' })
    @Get()
    allUsers() {
        return of([]);
    }

    @ApiOperation({ summary: '获取某一用户' })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Get(':username')
    currentUser(@Param('username') username: string, @Request() req) {
        return this.userService.test(req.user);
    }
}
