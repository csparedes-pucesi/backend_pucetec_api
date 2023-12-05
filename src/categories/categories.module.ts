import { Module } from '@nestjs/common'
import { CategoriesService } from './categories.service'
import { CategoriesController } from './categories.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { CategoryEntity, CategorySchema } from './entities/category.entity'
import { ConfigModule } from '@nestjs/config'

@Module({
    controllers: [CategoriesController],
    providers: [CategoriesService],
    imports: [
        MongooseModule.forFeature([
            { name: CategoryEntity.name, schema: CategorySchema },
        ]),
        ConfigModule,
    ],
    exports: [CategoriesService],
})
export class CategoriesModule {}
