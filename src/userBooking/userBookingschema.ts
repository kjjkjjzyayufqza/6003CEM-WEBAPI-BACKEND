import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose'
import { IsDate, IsEmail, IsObject } from 'class-validator'
import mongoose, { HydratedDocument } from 'mongoose'

export type UserBookingDocument = HydratedDocument<UserBooking>

export enum RoleEnum {
  Admin = 'Admin',
  Staff = 'Staff',
}

export enum GenderEnum {
  Male = 'Male',
  Female = 'Female',
}

export enum VaccineEnum {
  Sinovac = 'Sinovac',
  BioNtech = 'BioNtech',
}

export enum CatBreedEnum {
  Abyssinian = 'Abyssinian',
  AmericanBobtail = 'American Bobtail',
  AmericanCurl = 'American Curl',
  AmericanShorthair = 'American Shorthair',
  AmericanWirehair = 'American Wirehair',
  Balinese = 'Balinese',
  Bengal = 'Bengal',
  Birman = 'Birman',
  Bombay = 'Bombay',
  BritishShorthair = 'British Shorthair',
  Burmese = 'Burmese',
  Burmilla = 'Burmilla',
  Chartreux = 'Chartreux',
  ColorpointShorthair = 'Colorpoint Shorthair',
  CornishRex = 'Cornish Rex',
  Cymric = 'Cymric',
  DevonRex = 'Devon Rex',
  DomesticLonghair = 'Domestic Longhair',
  DomesticMediumHair = 'Domestic Medium Hair',
  DomesticShorthair = 'Domestic Shorthair',
  EgyptianMau = 'Egyptian Mau',
  ExoticShorthair = 'Exotic Shorthair',
  HavanaBrown = 'Havana Brown',
  Himalayan = 'Himalayan',
  JapaneseBobtail = 'Japanese Bobtail',
  Javanese = 'Javanese',
  Korat = 'Korat',
  LaPerm = 'LaPerm',
  MaineCoon = 'Maine Coon',
  Manx = 'Manx',
  NorwegianForestCat = 'Norwegian Forest Cat',
  Ocicat = 'Ocicat',
  Oriental = 'Oriental',
  Persian = 'Persian',
  RagaMuffin = 'RagaMuffin',
  Ragdoll = 'Ragdoll',
  RussianBlue = 'Russian Blue',
  ScottishFold = 'Scottish Fold',
  SelkirkRex = 'Selkirk Rex',
  Siamese = 'Siamese',
  Siberian = 'Siberian',
  Singapura = 'Singapura',
  Somali = 'Somali',
  Sphynx = 'Sphynx',
  Tonkinese = 'Tonkinese',
  TurkishAngora = 'Turkish Angora',
  TurkishVan = 'Turkish Van',
}

@Schema({ versionKey: false })
export class UserBooking {
  @Prop({ required: true })
  nameEn: string

  @Prop({ required: true })
  nameCn: string

  @Prop({ required: true, enum: GenderEnum })
  gender: GenderEnum

  @Prop({ required: true })
  identityDN: string

  @Prop({ required: true })
  mobile: string

  @Prop({ required: true })
  @IsDate()
  birthDate: Date

  @Prop({ required: true })
  address: string

  @Prop({ required: true })
  birthplace: string

  @Prop({ required: true, enum: VaccineEnum })
  vaccineBrand: VaccineEnum

  @Prop(
    raw({
      id: { type: String },
    }),
  )
  bookDate: Record<string, any>
}

export const UserBookingSchema = SchemaFactory.createForClass(UserBooking)
