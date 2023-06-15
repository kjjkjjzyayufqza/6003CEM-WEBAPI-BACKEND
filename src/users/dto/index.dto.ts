import { ApiProperty, PartialType } from '@nestjs/swagger'
import { IsEmail, MaxLength, MinLength } from 'class-validator'
import moment from 'moment'

export class UserDto {
  @ApiProperty({ required: true })
  name: string

  @ApiProperty({ required: true })
  @IsEmail()
  email: string

  @ApiProperty({ required: true })
  @MaxLength(8)
  @MinLength(8)
  phone: string

  @ApiProperty({ required: true })
  birthday: Date

  @ApiProperty({ required: true })
  password: string

  @ApiProperty({ required: true })
  photo: string

  @ApiProperty({ required: true })
  refreshToken: string
}

export class CreateUserDto {
  @ApiProperty({ required: true })
  name: string

  @ApiProperty({ required: true, default: 'a@a.com' })
  @IsEmail()
  email: string

  @ApiProperty({ required: true, default: '12345678' })
  @MaxLength(8)
  @MinLength(8)
  phone: string

  @ApiProperty({ required: true, default: new Date() })
  birthday: Date

  @ApiProperty({ required: true })
  password: string

  @ApiProperty()
  photo: string
}

export class UpdateUserDto extends PartialType(UserDto) {}
