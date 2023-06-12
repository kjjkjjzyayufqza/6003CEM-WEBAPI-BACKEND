import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { IsEmail, IsEnum } from 'class-validator'
import { Document, HydratedDocument } from 'mongoose'
import { CatBreedEnum, CentreEnum, GenderEnum } from 'src/interfaces/index.interface'

export type CatDocument = Cat & Document

@Schema({ versionKey: false })
export class Cat {
  @Prop({ required: true })
  name: string

  @Prop({ required: true })
  birthday: Date

  @Prop({ required: true, type: String, enum: GenderEnum })
  gender: GenderEnum

  @Prop({ required: true, type: String, enum: CatBreedEnum })
  @IsEnum(CatBreedEnum)
  breed: CatBreedEnum

  @Prop({ required: true })
  photo: string

  @Prop({ required: true })
  about: string

  @Prop({ required: true, type: String, enum: CentreEnum })
  centre: CentreEnum

  @Prop({ required: true })
  adopted: boolean

  @Prop({ required: true })
  addedTime: Date

  @Prop({ required: true })
  updatedTime: Date
}

export const CatsSchema = SchemaFactory.createForClass(Cat)
