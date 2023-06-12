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

@Injectable()
export class CatsService {
  constructor (
    @InjectModel(Cat.name)
    private catModel: Model<Cat>,
  ) {}

  async create (createCatDto: CreateCatDto): Promise<CatDocument> {
    const createdCat = new this.catModel(createCatDto)
    try {
      return createdCat.save()
    } catch (e) {
      console.log(e)
    }
  }

  async find (id, name, centre, adopted): Promise<CatDocument[]> {
    let query = {
      _id: id ? { $in: [id] } : { $exists: true },
      name: name ? { $in: [name] } : { $exists: true },
      centre: centre ? { $in: [centre] } : { $exists: true },
      adopted: adopted ? { $in: [adopted] } : { $exists: true },
    }

    return await this.catModel.find(query).exec()
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
      if (!existingStudent) {
        throw new NotFoundException(`id #${id} not found`)
      }
      return existingStudent
    } else {
      throw new NotFoundException(`id #${id} not found`)
    }
  }
}
