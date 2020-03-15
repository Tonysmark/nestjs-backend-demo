import { ApiProperty } from '@nestjs/swagger';

export class SigninRequest {
    @ApiProperty()
    username: string;
    @ApiProperty()
    password: string;
}
