import { Module } from '@nestjs/common'
import { ProductsService } from './products.service'
import { ProductsController } from './products.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { ProductEntity, ProductSchema } from './entities/product.entity'
import { AuthModule } from 'src/auth/auth.module'
import { ParseMongoIdPipe } from 'src/config/pipes/mongo-id.pipe'
import { ConfigModule } from '@nestjs/config'
import { CategoriesModule } from 'src/categories/categories.module'

@Module({
    controllers: [ProductsController],
    providers: [ProductsService, ParseMongoIdPipe],
    imports: [
        MongooseModule.forFeature([
            { name: ProductEntity.name, schema: ProductSchema },
        ]),
        ConfigModule,
        AuthModule,
        CategoriesModule,
    ],
})
export class ProductsModule {}
