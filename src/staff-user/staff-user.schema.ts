import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { IsEmail, IsEnum } from 'class-validator'
import { Document } from 'mongoose'
import { CentreEnum, GenderEnum, RoleEnum } from 'src/model'

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

  @Prop({ required: true, type: String })
  gender: GenderEnum

  @Prop({ required: true, type: String, enum: CentreEnum })
  centre: CentreEnum

  @Prop({ required: true, type: String, enum: RoleEnum })
  @IsEnum(RoleEnum)
  role: RoleEnum

  @Prop()
  refreshToken: string
}

export const StaffUserSchema = SchemaFactory.createForClass(StaffUser)
