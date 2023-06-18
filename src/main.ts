import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'
import { AllExceptionFilter } from './filters/all-exception.filter'
import { ResponseInterceptor } from './filters/response.interceptor'
declare const module: any
async function bootstrap () {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalFilters(new AllExceptionFilter())
  app.useGlobalInterceptors(new ResponseInterceptor())
  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .addBearerAuth()
    .setDescription('The cats API description')
    .setVersion('3.0')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)
  app.enableCors()
  await app.listen(process.env.PORT || 3000)

  if (module.hot) {
    module.hot.accept()
    module.hot.dispose(() => app.close())
  }
}
bootstrap()
