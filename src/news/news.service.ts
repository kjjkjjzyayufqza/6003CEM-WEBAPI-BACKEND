import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateNewsDto, UpdateNewsDto } from './dto/create-news.dto'
import { InjectModel } from '@nestjs/mongoose'
import { News, NewsDocument } from './news.schema'
import { Model } from 'mongoose'

@Injectable()
export class NewsService {
  constructor (@InjectModel(News.name) private newsModel: Model<NewsDocument>) {}

  async create (createNewsDto: CreateNewsDto): Promise<NewsDocument> {
    const createdUser = new this.newsModel(createNewsDto)
    return createdUser.save()
  }

  async find (): Promise<CreateNewsDto[]> {
    return await this.newsModel.find().exec()
  }

  async update (
    id: string,
    updateUserDto: CreateNewsDto,
  ): Promise<NewsDocument> {
    return this.newsModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec()
  }

  async remove (id: string) {
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      const result = await this.newsModel.findByIdAndRemove(id).exec()
      if (result) {
        return 'Success'
      } else {
        throw new NotFoundException(`id ${id} not found`)
      }
    } else {
      throw new NotFoundException(`id ${id} is incorrect`)
    }
  }
}
