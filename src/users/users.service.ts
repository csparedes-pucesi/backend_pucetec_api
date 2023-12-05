import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { InjectModel } from '@nestjs/mongoose'
import { UserEntity } from './entities/user.entity'
import { Model } from 'mongoose'
import { hashSync } from 'bcrypt'

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(UserEntity.name)
        private readonly userModel: Model<UserEntity>
    ) {}

    async create(createUserDto: CreateUserDto) {
        try {
            createUserDto.password = hashSync(createUserDto.password, 10)
            const user = await this.userModel.create(createUserDto)
            await user.save()
            return user
        } catch (error) {
            throw new BadRequestException(error.message)
        }
    }

    findAll() {
        return this.userModel.find()
    }

    async findByEmail(email: string) {
        const user = this.userModel.findOne({ email })
        if (!user) {
            throw new BadRequestException('User not found')
        }
        return user
    }

    async findOne(id: string) {
        const user = await this.userModel.findById(id)
        if (!user) {
            throw new BadRequestException('User not found')
        }
        return user
    }

    update(id: string, updateUserDto: UpdateUserDto) {
        if (updateUserDto.password) {
            updateUserDto.password = hashSync(updateUserDto.password, 10)
        }
        const user = this.userModel.findByIdAndUpdate(id, updateUserDto)
        if (!user) {
            throw new BadRequestException('User not found')
        }
        return user
    }

    remove(id: string) {
        const user = this.userModel.findByIdAndDelete(id)
        if (!user) {
            throw new BadRequestException('User not found')
        }
        return user
    }
}
