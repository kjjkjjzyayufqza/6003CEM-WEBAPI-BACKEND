import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from '@nestjs/config'
import { BookingDateModule } from './booking-date/booking-date.module'
import { AuthModule } from './auth/auth.module'
import { UserBookingModule } from './userBooking/userBooking.module'
import { UserBookingController } from './userBooking/userBooking.controller'
import { UsersModule } from './users/users.module'
import { JwtModule } from '@nestjs/jwt'
import { CatsModule } from './cats/cats.module'
import { StaffUserModule } from './staff-user/staff-user.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({
      global: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    UserBookingModule,
    BookingDateModule,
    AuthModule,
    UsersModule,
    CatsModule,
    StaffUserModule,
  ],
  controllers: [AppController, UserBookingController],
  providers: [AppService],
})
export class AppModule {}
