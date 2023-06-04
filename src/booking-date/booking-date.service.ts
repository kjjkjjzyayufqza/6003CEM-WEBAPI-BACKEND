import { HttpException, Injectable, NotFoundException } from '@nestjs/common'
import { CreateBookingDateDto } from './dto/create-booking-date.dto'
import { UpdateBookingDateDto } from './dto/update-booking-date.dto'
import { BookingDate } from './booking-date.schema'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

@Injectable()
export class BookingDateService {
  constructor (
    @InjectModel(BookingDate.name) private bookingDateModel: Model<BookingDate>,
  ) {}

  async create (createUserDto: CreateBookingDateDto): Promise<BookingDate> {
    const createdUser = new this.bookingDateModel(createUserDto)
    return createdUser.save()
  }

  async createAll (createUserDto: CreateBookingDateDto[]): Promise<BookingDate[]> {
    const createdUserArray = [];

    for (let i = 0; i < createUserDto.length; i++) {
      const user = createUserDto[i];
      const createdUser = new this.bookingDateModel(user);
      const savedUser = await createdUser.save();
      createdUserArray.push(savedUser);
    }
    return createdUserArray
  }

  async find (startTime, endTime, venues): Promise<BookingDate[]> {
    let query = {
      startTime: startTime ? { $gte: new Date(startTime) } : { $exists: true },
      endTime: endTime ? { $lte: new Date(endTime) } : { $exists: true },
      venues: venues ? { $in: [venues] } : { $exists: true },
    }

    return await this.bookingDateModel.find(query).exec()
  }

  async findById (id): Promise<BookingDate> {
    return await this.bookingDateModel.findById(id).exec()
  }

  async remove (id: string) {
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      const result = await this.bookingDateModel.findByIdAndRemove(id).exec()
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
