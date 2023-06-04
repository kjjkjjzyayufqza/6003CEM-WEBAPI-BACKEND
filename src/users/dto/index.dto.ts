import { ApiProperty, PartialType } from '@nestjs/swagger'
import { IsEmail } from 'class-validator'

export class UserDto {
  @ApiProperty({ required: true })
  name: string

  @ApiProperty({ required: true })
  email: string

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

  @ApiProperty({ required: true })
  password: string

  @ApiProperty({ required: true })
  photo: string
}



export class UpdateUserDto extends PartialType(UserDto) {}

