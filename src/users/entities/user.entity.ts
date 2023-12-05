import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema({
    versionKey: false,
    collection: 'users',
})
export class UserEntity {
    @Prop()
    fullname: string

    @Prop({ unique: true })
    email: string

    @Prop()
    password: string

    @Prop()
    city: string
}

export const UserSchema = SchemaFactory.createForClass(UserEntity)
