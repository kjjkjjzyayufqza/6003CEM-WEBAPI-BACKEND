import { BadRequestException, Injectable } from '@nestjs/common'
import {
  CreateStaffUserDto,
  UpdateStaffUserDto,
} from './dto/create-staff-user.dto'
import { InjectModel } from '@nestjs/mongoose'
import { StaffUser, StaffUserDocument } from './staff-user.schema'
import { Model } from 'mongoose'
import { UserRole } from 'src/users/users.schema'

@Injectable()
export class StaffUserService {
  constructor (
    @InjectModel(StaffUser.name)
    private staffUserModel: Model<StaffUserDocument>,
  ) {}

  async findCurrentStaff (request) {
    const user = await this.staffUserModel.findById(request.sub).exec()
    if (!user) {
      throw new BadRequestException('User Not Found')
    }
    const result = {
      _id: user._id,
      name: user.name,
      email: user.email,
    }
    return result
  }

  async createStaff (
    createUserDto: CreateStaffUserDto,
  ): Promise<StaffUserDocument> {
    if (createUserDto.role != UserRole.Staff) {
      throw new BadRequestException('Role Error')
    }
    const createdUser = new this.staffUserModel(createUserDto)
    try {
      await createdUser.save()
    } catch (e) {
      console.log(e)
    }
    return createdUser.save()
  }

  async findByIdStaff (id: string): Promise<StaffUserDocument> {
    return this.staffUserModel.findById(id)
  }

  async findByUsernameStaff (username: string): Promise<StaffUserDocument> {
    return this.staffUserModel.findOne({ username }).exec()
  }

  async findByUserEmailStaff (email: string): Promise<StaffUserDocument> {
    return this.staffUserModel.findOne({ email }).exec()
  }

  async updateStaff (
    id: string,
    updateUserDto: UpdateStaffUserDto,
  ): Promise<StaffUserDocument> {
    return this.staffUserModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec()
  }

  async removeStaff (id: string): Promise<StaffUserDocument> {
    return this.staffUserModel.findByIdAndDelete(id).exec()
  }

  extractTokenFromRequestHeaderStaff (request) {
    const authHeader = request.headers.authorization
    if (authHeader) {
      // 如果在请求头中指定了 authorization header，将它分解成bearer token
      const [bearer, token] = authHeader.split(' ')
      if (bearer === 'Bearer' && token) {
        return token
      }
    }
    // 如果token不存在或不符合标准，返回null
    return null
  }
}
