import { IsMongoId, IsNumber, IsString } from 'class-validator'

export class CreateProductDto {
    @IsString()
    name: string

    @IsNumber()
    unitPrice: number

    @IsString()
    description: string

    @IsString()
    presentation: string

    @IsString()
    @IsMongoId()
    category: string
}
