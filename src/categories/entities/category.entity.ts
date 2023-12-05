import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'

@Schema({ versionKey: false, collection: 'categories' })
export class CategoryEntity {
    @Prop({ required: true })
    name: string

    @Prop({ required: true })
    description: string
}

export const CategorySchema = SchemaFactory.createForClass(CategoryEntity)
