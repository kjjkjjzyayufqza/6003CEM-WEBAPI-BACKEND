import { Module } from '@nestjs/common';
import { UserBookingService } from './userBooking.service';
import { UserBookingController } from './userBooking.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserBooking, UserBookingSchema } from './userBookingschema';

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
