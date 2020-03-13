import { ApiProperty } from '@nestjs/swagger';

export class UserBase {
    @ApiProperty()
    username: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;
}
