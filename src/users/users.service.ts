import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateUserDto, UpdateUserDto } from './dto/index.dto'
import { UserDocument, User, UserRole } from './users.schema'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class UsersService {
  constructor (
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async findCurrent (request) {
    const user = await this.userModel.findById(request.sub).exec()
    if (!user) {
      throw new BadRequestException('User Not Found')
    }
    const result = {
      _id: user._id,
      name: user.name,
      email: user.email,
      photo: user.photo,
      phone: user.phone,
    }
    return result
  }

  async findAll (): Promise<UserDocument[]> {
    return this.userModel.find().exec()
  }

  async findById (id: string): Promise<UserDocument> {
    return this.userModel.findById(id)
  }

  async findByUsername (username: string): Promise<UserDocument> {
    return this.userModel.findOne({ username }).exec()
  }

  async findByUserEmail (email: string): Promise<UserDocument> {
    return this.userModel.findOne({ email }).exec()
  }

  async create (createUserDto: CreateUserDto): Promise<UserDocument> {
    const createdUser = new this.userModel(createUserDto)
    try {
      await createdUser.save()
    } catch (e) {
      console.log(e)
    }
    return createdUser.save()
  }

  async update (
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserDocument> {
    return this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec()
  }

  async remove (id: string): Promise<UserDocument> {
    return this.userModel.findByIdAndDelete(id).exec()
  }

  extractTokenFromRequestHeader (request) {
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
