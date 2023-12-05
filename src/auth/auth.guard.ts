import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const request = context.switchToHttp().getRequest()
            const token = request.headers.authorization?.split(' ')[1]
            if (!token) throw new UnauthorizedException()

            const decoded = await this.jwtService.verifyAsync(token, {
                secret: this.configService.get('JWT_SECRET'),
            })
            request.user = decoded
            return true
        } catch (error) {
            throw new UnauthorizedException(error.message)
        }
    }
}
