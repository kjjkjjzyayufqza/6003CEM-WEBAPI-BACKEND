import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsDate } from 'class-validator'
import * as moment from 'moment'
import { CatBreedEnum, GenderEnum } from 'src/userBooking/userBookingschema'

export class CreateCatDto {
  @ApiProperty({ required: true, default: 'Mi' })
  name: string

  @ApiProperty({ required: true, default: '1' })
  age: string

  @ApiProperty({ required: true, enum: GenderEnum, default: GenderEnum.Male })
  gender: GenderEnum

  @ApiProperty({
    required: true,
    enum: CatBreedEnum,
    default: CatBreedEnum.Abyssinian,
  })
  breed: CatBreedEnum

  @ApiProperty({
    required: true,
    default: 'https://cdn2.thecatapi.com/images/J2PmlIizw.jpg',
  })
  photo: string

  @ApiProperty({ required: true, default: false })
  @IsBoolean()
  adopted: boolean

  @ApiProperty({ required: true, default: moment().format() })
  @IsDate()
  addedTime: Date

  @ApiProperty({ required: true, default: moment().format() })
  @IsDate()
  updatedTime: Date
}
