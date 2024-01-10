import { IsEmail, IsString } from 'class-validator'

export class LoginDto {
    @IsString()
    @IsEmail()
    email

    @IsString()
    password
}
