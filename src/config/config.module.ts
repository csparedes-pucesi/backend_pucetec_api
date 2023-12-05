import { Module } from '@nestjs/common'
import { ParseMongoIdPipe } from './pipes/mongo-id.pipe'

@Module({
    imports: [ConfigModule],
    exports: [ParseMongoIdPipe],
    providers: [ParseMongoIdPipe],
})
export class ConfigModule {}
