import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserBookingController } from './userBooking.controller';
import { UserBooking, UserBookingSchema } from './userBooking.schema';
import { UserBookingService } from './userBooking.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserBooking.name, schema: UserBookingSchema },
    ]),
  ],
  controllers: [UserBookingController],
  providers: [UserBookingService],
  exports: [UserBookingService],
})
export class UserBookingModule {}
