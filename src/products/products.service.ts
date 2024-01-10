import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { InjectModel } from '@nestjs/mongoose'
import { ProductEntity } from './entities/product.entity'
import { Model } from 'mongoose'
import { CategoriesService } from 'src/categories/categories.service'

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel(ProductEntity.name)
        private readonly productModel: Model<ProductEntity>,
        private readonly categoriesService: CategoriesService
    ) {}
    async create(createProductDto: CreateProductDto) {
        try {
            this.categoriesService.findOne(createProductDto.category)
            const product = await this.productModel.create(createProductDto)
            await product.save()
            return product
        } catch (error) {
            throw new BadRequestException(error.message)
        }
    }

    findAll() {
        return this.productModel.find().populate('category')
    }

    findAllByCategory(category: string) {
        try {
            const products = this.productModel.find({ category })
            if (!products) {
                throw new BadRequestException('Category not found')
            }
            return products
        } catch (error) {
            throw new BadRequestException(error.message)
        }
    }

    findOne(id: string) {
        try {
            const product = this.productModel.findById(id)
            if (!product) {
                throw new BadRequestException('Product not found')
            }
            return product
        } catch (error) {
            throw new BadRequestException(error.message)
        }
    }

    async update(id: string, updateProductDto: UpdateProductDto) {
        try {
            const product = await this.productModel.findByIdAndUpdate(
                id,
                updateProductDto
            )
            if (!product) {
                throw new BadRequestException('Product not found')
            }
            return await this.productModel.findById(id)
        } catch (error) {
            throw new BadRequestException(error.message)
        }
    }

    remove(id: string) {
        try {
            const product = this.productModel.findByIdAndDelete(id)
            if (!product) {
                throw new BadRequestException('Product not found')
            }
            return product
        } catch (error) {
            throw new BadRequestException(error.message)
        }
    }
}
