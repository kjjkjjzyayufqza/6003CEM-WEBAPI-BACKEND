import { ApiProperty, PartialType } from '@nestjs/swagger'

export class News {
  @ApiProperty({ required: true })
  catId: string

  @ApiProperty({ required: true })
  catName: string

  @ApiProperty({ required: true })
  catAbout: string

  @ApiProperty({ required: true })
  catPhoto: string

  @ApiProperty({ required: true })
  time: Date
}

export class CreateNewsDto extends PartialType(News) {}

export class UpdateNewsDto extends PartialType(CreateNewsDto) {}
