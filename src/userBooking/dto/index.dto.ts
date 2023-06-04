import { ApiProperty, PartialType } from '@nestjs/swagger'
import { IsEnum, IsInt, IsString, MaxLength, MinLength } from 'class-validator'
import { GenderEnum, VaccineEnum } from '../userBookingschema'
import { CreateBookingDateDto } from 'src/booking-date/dto/create-booking-date.dto'

export class CreateUserBookingDto {
  @ApiProperty({ required: true })
  nameEn: string

  @ApiProperty({ required: true })
  nameCn: string

  @ApiProperty({ required: true, default: GenderEnum.Male })
  gender: GenderEnum

  @ApiProperty({ required: true })
  identityDN: string

  @ApiProperty({ required: true })
  mobile: string

  @ApiProperty({ required: true })
  birthDate: Date

  @ApiProperty({ required: true })
  address: string

  @ApiProperty({ required: true })
  birthplace: string

  @ApiProperty({ required: true, default: VaccineEnum.BioNtech })
  vaccineBrand: VaccineEnum

  @ApiProperty({ required: true, default: { id: '646b4ea2b1313112c47e7f4b' } })
  bookDate: {
    id: string
  }
}

export class CreateEncryptedUserBookingDto {
  @ApiProperty({ required: true })
  encryptedData: string
}

export class UpdateUserDto extends PartialType(CreateUserBookingDto) {}
