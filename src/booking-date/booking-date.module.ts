import { Module } from '@nestjs/common';
import { BookingDateService } from './booking-date.service';
import { BookingDateController } from './booking-date.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BookingDate, BookingDateSchema } from './booking-date.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BookingDate.name, schema: BookingDateSchema },
    ]),
  ],
  controllers: [BookingDateController],
  providers: [BookingDateService],
})
export class BookingDateModule {}
