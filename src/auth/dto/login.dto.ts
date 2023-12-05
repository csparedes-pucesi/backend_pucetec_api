import { IsEmail, IsString, IsStrongPassword } from 'class-validator'

export class LoginDto {
    @IsString()
    @IsEmail()
    email

    @IsString()
    @IsStrongPassword()
    password
}
