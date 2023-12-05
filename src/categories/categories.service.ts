import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { InjectModel } from '@nestjs/mongoose'
import { CategoryEntity } from './entities/category.entity'
import { Model } from 'mongoose'

@Injectable()
export class CategoriesService {
    constructor(
        @InjectModel(CategoryEntity.name)
        private readonly categoryModel: Model<CategoryEntity>
    ) {}

    async create(createCategoryDto: CreateCategoryDto) {
        const category = await this.categoryModel.create(createCategoryDto)
        await category.save()
        return category
    }

    findAll() {
        return this.categoryModel.find()
    }

    findOne(id: string) {
        const category = this.categoryModel.findById(id)
        if (!category) {
            throw new BadRequestException('Category not found')
        }
        return category
    }

    async update(id: string, updateCategoryDto: UpdateCategoryDto) {
        const category = await this.categoryModel.findByIdAndUpdate(
            id,
            updateCategoryDto
        )
        if (!category) {
            throw new BadRequestException('Category not found')
        }
        return category
    }

    remove(id: string) {
        const category = this.categoryModel.findByIdAndDelete(id)
        if (!category) {
            throw new BadRequestException('Category not found')
        }
        return category
    }
}
