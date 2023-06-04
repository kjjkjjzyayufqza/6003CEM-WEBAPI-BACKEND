import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsDate, IsDateString, IsEmail } from 'class-validator';
import { HydratedDocument } from 'mongoose';

export type BookingDateDocument = HydratedDocument<BookingDate>;

@Schema({ versionKey: false })
export class BookingDate {
  @Prop({ required: true })
  startTime: Date;

  @Prop({ required: true })
  endTime: Date;

  @Prop({ required: true })
  venues: string;
}

export const BookingDateSchema = SchemaFactory.createForClass(BookingDate);
