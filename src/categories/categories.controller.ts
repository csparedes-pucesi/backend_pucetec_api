import {
    Controller,
    Get,
    UseGuards,
    // Post,
    // Body,
    // Patch,
    // Param,
    // Delete,
} from '@nestjs/common'
import { CategoriesService } from './categories.service'
import { AuthGuard } from 'src/auth/auth.guard'
// import { CreateCategoryDto } from './dto/create-category.dto'
// import { UpdateCategoryDto } from './dto/update-category.dto'
// import { ParseMongoIdPipe } from 'src/config/pipes/mongo-id.pipe'

@Controller('categories')
@UseGuards(AuthGuard)
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}

    // @Post()
    // create(@Body() createCategoryDto: CreateCategoryDto) {
    //     return this.categoriesService.create(createCategoryDto)
    // }

    @Get()
    findAll() {
        return this.categoriesService.findAll()
    }

    // @Get(':id')
    // findOne(@Param('id', ParseMongoIdPipe) id: string) {
    //     return this.categoriesService.findOne(id)
    // }

    // @Patch(':id')
    // update(
    //     @Param('id', ParseMongoIdPipe) id: string,
    //     @Body() updateCategoryDto: UpdateCategoryDto
    // ) {
    //     return this.categoriesService.update(id, updateCategoryDto)
    // }

    // @Delete(':id')
    // remove(@Param('id', ParseMongoIdPipe) id: string) {
    //     return this.categoriesService.remove(id)
    // }
}
