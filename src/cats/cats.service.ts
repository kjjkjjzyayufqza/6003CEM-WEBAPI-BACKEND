import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { CreateCatDto, UpdateCatDto } from './dto/create-cat.dto'
import { InjectModel } from '@nestjs/mongoose'
import { Cat, CatDocument } from './cats.schema'
import { Model } from 'mongoose'
import { validate } from 'class-validator'
import { plainToClass } from 'class-transformer'
import { News } from 'src/news/news.schema'

@Injectable()
export class CatsService {
  constructor (
    @InjectModel(Cat.name)
    private catModel: Model<Cat>,
    @InjectModel(News.name)
    private newsModel: Model<News>,
  ) {}

  // async create (createCatDto: CreateCatDto): Promise<CatDocument> {
  //   const createdCat = new this.catModel(createCatDto)
  //   try {
  //     return createdCat.save()
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }

  async create (createCatDto: CreateCatDto[]): Promise<CatDocument[]> {
    const createdCatArray = []

    for (let i = 0; i < createCatDto.length; i++) {
      const cat = createCatDto[i]
      const createdCat = new this.catModel(cat)
      const savedCat = await createdCat.save()
      createdCatArray.push(savedCat)
    }
    return createdCatArray
  }

  async find (
    id,
    name,
    breed,
    centre,
    gender,
    adopted,
    page,
    pageSize,
  ): Promise<{ data: CatDocument[]; totalNumber: number }> {
    const skip = (page - 1) * pageSize
    const limit = pageSize

    let query = {
      _id: id ? { $in: [id] } : { $exists: true },
      name: name ? { $in: [name] } : { $exists: true },
      breed: breed ? { $in: [breed] } : { $exists: true },
      centre: centre ? { $in: [centre] } : { $exists: true },
      gender: gender ? { $in: [gender] } : { $exists: true },
      adopted: adopted ? { $in: [adopted] } : { $exists: true },
    }
    const data = await this.catModel.find(query).skip(skip).limit(limit).exec()
    const totalNumber = await this.catModel.find(query).count()
    return { data, totalNumber }
  }

  async update (id: String, updateCatDto: UpdateCatDto): Promise<CatDocument> {
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      const existingStudent = await this.catModel.findByIdAndUpdate(
        id,
        updateCatDto,
        {
          new: true,
        },
      )
      if (!existingStudent) {
        throw new NotFoundException(`id #${id} not found`)
      }
      return existingStudent
    } else {
      throw new NotFoundException(`id #${id} not found`)
    }
  }

  async remove (id: String) {
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      const existingStudent = await this.catModel.deleteOne({ _id: id })
      const deleteNews = await this.newsModel.deleteMany({ catId: id })
      if (!existingStudent) {
        throw new NotFoundException(`id #${id} not found`)
      }
      return existingStudent
    } else {
      throw new NotFoundException(`id #${id} not found`)
    }
  }
}
