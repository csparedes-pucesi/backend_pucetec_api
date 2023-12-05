import { Module } from '@nestjs/common'
import { UsersModule } from './users/users.module'
import { ProductsModule } from './products/products.module'
import { CategoriesModule } from './categories/categories.module'
import { AuthModule } from './auth/auth.module'
import { ConfigModule as ConfigModuleNest } from '@nestjs/config'
import { ConfigModule } from './config/config.module'
import { MongooseModule } from '@nestjs/mongoose'
import { MongooseDbService } from './config/db/mongo.db'
import { ThrottlerModule } from '@nestjs/throttler'

@Module({
    imports: [
        ConfigModuleNest.forRoot(),
        MongooseModule.forRootAsync({
            imports: [ConfigModuleNest],
            useClass: MongooseDbService,
        }),
        ThrottlerModule.forRoot([
            {
                ttl: 6000,
                limit: 10,
            },
        ]),
        UsersModule,
        ProductsModule,
        CategoriesModule,
        AuthModule,
        ConfigModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
