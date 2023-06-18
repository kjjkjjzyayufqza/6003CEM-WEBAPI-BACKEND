import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { CreateUserBookingDto, UpdateUserDto } from './dto/index.dto'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { UserBooking } from './userBooking.schema'

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

  async findAll (mobile?: string, centre?: string): Promise<UserBooking[]> {
    let query = {
      phone: mobile ? { $in: [mobile] } : { $exists: true },
      centre: centre ? { $in: [centre] } : { $exists: true },
    }
    return await this.userBookingModel.find(query).exec()
  }
}
