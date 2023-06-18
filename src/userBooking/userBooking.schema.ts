import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose'
import { IsDate, IsEmail, IsObject } from 'class-validator'
import mongoose, { HydratedDocument } from 'mongoose'
import { CentreEnum, GenderEnum, VaccineEnum } from 'src/model'

export type UserBookingDocument = HydratedDocument<UserBooking>

@Schema({ versionKey: false })
export class UserBooking {
  @Prop({ required: true })
  userId: string

  @Prop({ required: true })
  name: string

  @Prop({ required: true })
  email: string

  @Prop({ required: true, type: String, enum: GenderEnum })
  gender: GenderEnum

  @Prop({ required: true })
  phone: string

  @Prop({ required: true })
  bookingTime: Date

  @Prop({ required: true, type: String, enum: CentreEnum })
  centre: CentreEnum

  @Prop({ required: true })
  catId: string
}

export const UserBookingSchema = SchemaFactory.createForClass(UserBooking)
