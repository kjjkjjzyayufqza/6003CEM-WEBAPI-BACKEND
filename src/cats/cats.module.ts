import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { CatsController } from './cats.controller'
import { Cat, CatsSchema } from './cats.schema'
import { CatsService } from './cats.service'
import { News, NewsSchema } from 'src/news/news.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cat.name, schema: CatsSchema }]),
    MongooseModule.forFeature([{ name: News.name, schema: NewsSchema }]),
  ],
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService],
})
export class CatsModule {}
