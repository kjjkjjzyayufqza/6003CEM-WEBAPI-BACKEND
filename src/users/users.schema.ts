import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { IsEmail } from 'class-validator'
import { Document } from 'mongoose'
import { GenderEnum } from 'src/main2'

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

  @Prop({ required: true, type: String })
  gender: GenderEnum

  @Prop({ required: true })
  birthday: Date

  @Prop({ required: true })
  phone: string

  @Prop({ required: true })
  password: string

  @Prop()
  photo: string

  @Prop()
  refreshToken: string
}

export const UserSchema = SchemaFactory.createForClass(User)

export type FavouritesDocument = Favourites & Document

@Schema({
  versionKey: false,
  // toJSON: {
  //   transform: function (doc, ret) {
  //     delete ret._id
  //     delete ret.__v
  //     ret.Favourites = ret.Favourites && ret.Favourites.map(fav => fav.catId)
  //   },
  // },
})
export class Favourites {
  @Prop({
    required: true,
  })
  userId: string

  @Prop({
    required: true,
    type: [String],
  })
  Favourites: string[]
}

export const FavouritesSchema = SchemaFactory.createForClass(Favourites)
