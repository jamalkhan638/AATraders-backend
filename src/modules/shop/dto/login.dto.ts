import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches, MinLength } from 'class-validator';

export class LoginDto {
    @ApiProperty()
    email: string;


    @IsNotEmpty()
    @ApiProperty()
    password: string;
}
