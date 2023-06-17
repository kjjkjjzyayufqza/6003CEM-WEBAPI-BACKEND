import { ApiProperty, PartialType } from '@nestjs/swagger'
import { CentreEnum, GenderEnum, VaccineEnum } from 'src/model'

export class CreateUserBookingDto {
  @ApiProperty({ required: true })
  name: string

  @ApiProperty({ required: true })
  email: string

  @ApiProperty({
    required: true,
    type: String,
    enum: GenderEnum,
    default: GenderEnum.Male,
  })
  gender: GenderEnum

  @ApiProperty({ required: true })
  phone: string

  @ApiProperty({ required: true })
  bookingTime: Date

  @ApiProperty({
    required: true,
    type: String,
    enum: CentreEnum,
    default: CentreEnum.KwunTong,
  })
  centre: CentreEnum

  @ApiProperty({ required: true })
  catId: string
}

export class UpdateUserDto extends PartialType(CreateUserBookingDto) {}
