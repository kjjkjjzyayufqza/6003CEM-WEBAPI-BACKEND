import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { IsEmail } from 'class-validator'
import { Document } from 'mongoose'

export type UserDocument = User & Document

export enum UserRole {
  Staff = 'Staff',
  Admin = 'Admin',
}


@Schema({ versionKey: false })
export class User {
  @Prop({ required: true })
  name: string

  @Prop({ required: true, unique: true })
  @IsEmail()
  email: string

  @Prop({ required: true })
  password: string

  @Prop({ required: true })
  photo: string

  @Prop()
  refreshToken: string
}
export const UserSchema = SchemaFactory.createForClass(User)
