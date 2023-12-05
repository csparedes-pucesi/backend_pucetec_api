import {
    BadRequestException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common'
import { UsersService } from 'src/users/users.service'
import { LoginDto } from './dto/login.dto'
import { compareSync } from 'bcrypt'
import { JwtPayloadInterface } from './jwt-payload.interface'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) {}

    async login(loginDto: LoginDto) {
        try {
            const user = await this.usersService.findByEmail(loginDto.email)
            const checkPassword = compareSync(loginDto.password, user.password)
            if (!checkPassword) {
                throw new Error('Wrong password')
            }
            return {
                user,
                token: this.signToken({
                    email: user.email,
                    id: user._id.toString(),
                }),
            }
        } catch (error) {
            throw new BadRequestException(error.message)
        }
    }

    async validateUser(payload: JwtPayloadInterface) {
        try {
            return await this.usersService.findOne(payload.id)
        } catch (error) {
            throw new UnauthorizedException(error.message)
        }
    }

    private signToken(payload: JwtPayloadInterface) {
        return this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_SECRET'),
        })
    }
}
