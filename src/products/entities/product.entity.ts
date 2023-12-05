import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Types } from 'mongoose'

@Schema({ collection: 'products', versionKey: false })
export class ProductEntity {
    @Prop({ required: true })
    name: string

    @Prop({ required: true })
    unitPrice: number

    @Prop({ required: true })
    description: string

    @Prop({ required: true })
    presentation: string

    @Prop({ type: Types.ObjectId, ref: 'CategoryEntity' })
    category: Types.ObjectId
}

export const ProductSchema = SchemaFactory.createForClass(ProductEntity)
