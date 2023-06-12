import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import {
  CreateEncryptedUserBookingDto,
  CreateUserBookingDto,
  UpdateUserDto,
} from './dto/index.dto'
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

  async createEncryptedData (
    EncryptedData: CreateEncryptedUserBookingDto,
  ): Promise<String> {
    const key = process.env.ENCRYPT_SECRET
    // console.log(EncryptedData)
    try {
      if (EncryptedData.encryptedData.length < 64) {
        throw new BadRequestException('Data Error')
      }
      const iv_d = CryptoJS.enc.Hex.parse(
        EncryptedData.encryptedData.substr(0, 32),
      ) // 从字符串中提取前 32 个字符作为 IV
      const ciphertext = EncryptedData.encryptedData.substr(32)
      const decrypted = CryptoJS.AES.decrypt(ciphertext, key, {
        iv: iv_d,
      })
      if (decrypted) {
        const decryptedString = decrypted.toString(CryptoJS.enc.Utf8)

        const createUserDto = JSON.parse(decryptedString)
        console.log(createUserDto)
        const createdUser = new this.userBookingModel(createUserDto)
        await createdUser.save()
        return 'Done'
      }
    } catch (e) {
      throw new BadRequestException('Data Error')
    }
    // const createdUser = new this.userBookingModel(createUserDto);
    // return createdUser.save();
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
