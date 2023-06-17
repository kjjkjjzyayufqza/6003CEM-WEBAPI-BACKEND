import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { CreateUserBookingDto, UpdateUserDto } from './dto/index.dto'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { UserBooking } from './userBooking.schema'
import * as CryptoJS from 'crypto-js'

@Injectable()
export class UserBookingService {
  constructor (
    @InjectModel(UserBooking.name) private userBookingModel: Model<UserBooking>,
  ) {}

  async create (createUserDto: CreateUserBookingDto): Promise<UserBooking> {
    const createdUser = new this.userBookingModel(createUserDto)
    return createdUser.save()
  }

  async updateStudent (
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserBooking> {
    if (userId.match(/^[0-9a-fA-F]{24}$/)) {
      const existingStudent = await this.userBookingModel.findByIdAndUpdate(
        userId,
        updateUserDto,
      )
      if (!existingStudent) {
        throw new NotFoundException(`Student #${userId} not found`)
      }
      return existingStudent
    } else {
      throw new NotFoundException(`Student #${userId} not found`)
    }
  }

  async findAll (mobile?: any): Promise<UserBooking[]> {
    let query = {}
    if (mobile) {
      query = { mobile: { $in: [mobile] } }
    }
    return await this.userBookingModel.find(query).exec()
  }
}
