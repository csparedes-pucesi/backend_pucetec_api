import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Logger, ValidationPipe } from '@nestjs/common'
import helmet from 'helmet'
import * as cookieParser from 'cookie-parser'

async function bootstrap() {
    const logger = new Logger('Main')
    const port = +process.env.PORT
    const app = await NestFactory.create(AppModule)
    app.use(helmet())
    app.enableCors()
    app.use(cookieParser())

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
        })
    )

    await app.listen(port)
    logger.log(`Server running in port: ${port}`)
}
bootstrap()
