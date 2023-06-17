import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type NewsDocument = News & Document

@Schema({ versionKey: false })
export class News {
  @Prop({ required: true })
  catId: string

  @Prop({ required: true })
  catName: string

  @Prop({ required: true })
  catAbout: string

  @Prop({ required: true })
  catPhoto: string

  @Prop({ required: true })
  time: Date
}

export const NewsSchema = SchemaFactory.createForClass(News)
