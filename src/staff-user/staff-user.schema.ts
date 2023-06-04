import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { IsEmail, IsEnum } from 'class-validator'
import { Document } from 'mongoose'
import { RoleEnum } from 'src/userBooking/userBookingschema'
import { UserRole } from 'src/users/users.schema'

export type StaffUserDocument = StaffUser & Document

@Schema({ versionKey: false })
export class StaffUser {
  @Prop({ required: true })
  name: string

  @Prop({ required: true, unique: true })
  @IsEmail()
  email: string

  @Prop({ required: true })
  password: string

  @Prop({ required: true })
  photo: string

  @Prop({ required: true, type: String, enum: RoleEnum })
  @IsEnum(RoleEnum)
  role: RoleEnum

  @Prop()
  refreshToken: string
}

export const StaffUserSchema = SchemaFactory.createForClass(StaffUser)
