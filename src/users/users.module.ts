import { Module, forwardRef } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { UserEntity, UserSchema } from './entities/user.entity'
import { ParseMongoIdPipe } from 'src/config/pipes/mongo-id.pipe'
import { AuthModule } from 'src/auth/auth.module'
import { ConfigModule } from '@nestjs/config'

@Module({
    controllers: [UsersController],
    providers: [UsersService, ParseMongoIdPipe],
    imports: [
        MongooseModule.forFeature([
            { name: UserEntity.name, schema: UserSchema },
        ]),
        ConfigModule,
        forwardRef(() => AuthModule),
    ],
    exports: [UsersService],
})
export class UsersModule {}
