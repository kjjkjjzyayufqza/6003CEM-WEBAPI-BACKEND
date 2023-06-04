import { PartialType } from '@nestjs/swagger';
import { CreateBookingDateDto } from './create-booking-date.dto';

export class UpdateBookingDateDto extends PartialType(CreateBookingDateDto) {}
