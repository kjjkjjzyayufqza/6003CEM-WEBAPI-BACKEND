import { ApiProperty, PartialType } from '@nestjs/swagger'
import {
  IsArray,
  IsEmail,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator'
import moment from 'moment'
import { GenderEnum } from 'src/model'

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

  @ApiProperty({ required: true, enum: GenderEnum })
  gender: GenderEnum

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

  @ApiProperty({ required: true, enum: GenderEnum, default: GenderEnum.Male })
  gender: GenderEnum

  @ApiProperty({ required: true })
  password: string

  @ApiProperty()
  photo: string
}

export class UpdateUserDto extends PartialType(UserDto) {}

export class FavouritesDto {
  @ApiProperty({ required: true })
  userId: string

  @ApiProperty({
    required: true,
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  Favourites: String[]
}

export class CreateFavouritesDto {
  @ApiProperty({
    required: true,
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  Favourites: String[]
}

export class UpdateFavouritesDto extends PartialType(FavouritesDto) {}
