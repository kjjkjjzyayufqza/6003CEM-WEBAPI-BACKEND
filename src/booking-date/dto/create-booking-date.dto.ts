import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { ArrayMinSize, IsDate, IsDateString, IsEmail, IsNotEmpty, IsString, ValidateNested } from 'class-validator'

export class CreateBookingDateDto {
  @ApiProperty({ required: true })
  @IsDateString()
  startTime: Date

  @ApiProperty({ required: true })
  @IsDateString()
  endTime: Date

  @ApiProperty({ required: true })
  @IsNotEmpty()
  venues: string
}

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}