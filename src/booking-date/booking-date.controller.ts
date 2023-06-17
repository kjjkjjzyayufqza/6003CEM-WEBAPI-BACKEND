import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseArrayPipe,
} from '@nestjs/common'
import { BookingDateService } from './booking-date.service'
import {
  CreateBookingDateDto,
  CreateUserDto,
} from './dto/create-booking-date.dto'
import { UpdateBookingDateDto } from './dto/update-booking-date.dto'
import { ApiBody, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger'
import { BookingDate } from './booking-date.schema'

@ApiTags('booking')
@Controller('bookingDate')
export class BookingDateController {
  constructor (private readonly bookingDateService: BookingDateService) {}

  // @Post()
  // @ApiBody({ type: [CreateBookingDateDto] })
  // create (
  //   @Body(new ParseArrayPipe({ items: CreateBookingDateDto}))
  //   createBookingDateDto: CreateBookingDateDto[],
  // ) {
  //   return this.bookingDateService.createAll(createBookingDateDto)
  // }

  // @Get()
  // @ApiQuery({
  //   name: 'startTime',
  //   type: Date,
  //   required: false,
  // })
  // @ApiQuery({
  //   name: 'endTime',
  //   type: Date,
  //   required: false,
  // })
  // @ApiQuery({
  //   name: 'venues',
  //   type: String,
  //   required: false,
  // })
  // findAll (
  //   @Query('startTime') startTime: Date,
  //   @Query('endTime') endTime: Date,
  //   @Query('venues') venues: string,
  // ): Promise<BookingDate[]> {
  //   return this.bookingDateService.find(startTime, endTime, venues)
  // }

  // @Get(':id')
  // @ApiParam({
  //   name: 'id',
  //   type: String,
  //   required: true,
  // })
  // async findById (@Param('id') id: Date): Promise<BookingDate> {
  //   return this.bookingDateService.findById(id)
  // }

  // @Delete(':id')
  // remove (@Param('id') id: string) {
  //   return this.bookingDateService.remove(id)
  // }
}
