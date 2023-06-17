import { ApiProperty, PartialType } from '@nestjs/swagger'
import { IsBoolean, IsDate, IsEnum } from 'class-validator'
import * as moment from 'moment'
import { CatBreedEnum, CentreEnum, GenderEnum } from 'src/model'

export class CreateCatDto {
  @ApiProperty({ required: true, default: 'jojo' })
  name: string

  @ApiProperty({ required: true, default: moment().format() })
  birthday: Date

  @ApiProperty({ required: true, enum: GenderEnum, default: GenderEnum.Male })
  @IsEnum(GenderEnum)
  gender: GenderEnum

  @ApiProperty({
    required: true,
    enum: CatBreedEnum,
    default: CatBreedEnum.Abyssinian,
  })
  @IsEnum(CatBreedEnum)
  breed: CatBreedEnum

  @ApiProperty({
    required: true,
    default: 'https://cdn2.thecatapi.com/images/J2PmlIizw.jpg',
  })
  photo: string

  @ApiProperty({
    required: true,
  })
  about: string

  @ApiProperty({
    required: true,
    enum: CentreEnum,
    default: CentreEnum.KwunTong,
  })
  @IsEnum(CentreEnum)
  centre: CentreEnum

  @ApiProperty({ required: true, default: false })
  @IsBoolean()
  adopted: boolean

  @ApiProperty({ required: true, default: moment().format() })
  addedTime: Date

  @ApiProperty({ required: true, default: moment().format() })
  updatedTime: Date
}

export class UpdateCatDto extends PartialType(CreateCatDto) {}
