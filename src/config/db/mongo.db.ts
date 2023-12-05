import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { MongooseModuleOptions, MongooseOptionsFactory } from '@nestjs/mongoose'

@Injectable()
export class MongooseDbService implements MongooseOptionsFactory {
    constructor(private readonly configService: ConfigService) {}

    createMongooseOptions():
        | MongooseModuleOptions
        | Promise<MongooseModuleOptions> {
        return {
            uri: this.configService.get('MONGO_CONN'),
            dbName: this.configService.get('MONGO_DB'),
            user: this.configService.get('MONGO_USER'),
            pass: this.configService.get('MONGO_PASS'),
        }
    }
}
