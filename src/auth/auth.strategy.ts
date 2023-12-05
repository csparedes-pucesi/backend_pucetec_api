import { Strategy, ExtractJwt } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthService } from './auth.service'
import { JwtPayloadInterface } from './jwt-payload.interface'
import { UsersService } from 'src/users/users.service'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private authService: AuthService,
        private readonly usersService: UsersService,
        configService: ConfigService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get('JWT_SECRET'),
        })
    }

    async validate(payload: JwtPayloadInterface) {
        const user = await this.authService.validateUser(payload)
        if (!user) {
            throw new UnauthorizedException()
        }
        return user
    }
}
