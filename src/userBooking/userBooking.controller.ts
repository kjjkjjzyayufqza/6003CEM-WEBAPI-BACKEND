import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  UseGuards,
  Query,
  Req,
} from '@nestjs/common'
import { CreateUserBookingDto, UpdateUserDto } from './dto/index.dto'
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiProperty,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { UserBookingService } from './userBooking.service'
import { AuthGuard } from 'src/auth/auth.guard'
import { UserBooking, UserBookingSchema } from './userBooking.schema'
import { StaffAuthGuard } from 'src/auth/staff-auth.guard'
import {
  ApiBadResponseCustom,
  ApiCreatedResponseCustom,
  ApiOkResponseCustom,
  ApiUnauthorizedResponseCustom,
} from 'src/model'

@ApiTags('booking')
@Controller('userBooking')
export class UserBookingController {
  constructor (private readonly userBookingService: UserBookingService) {}

  @Post()
  @ApiOperation({ summary: 'Create User Booking' })
  @ApiCreatedResponseCustom(CreateUserBookingDto)
  @ApiBadResponseCustom(CreateUserBookingDto)
  @ApiUnauthorizedResponseCustom(CreateUserBookingDto)
  create (@Body() createUserDto: CreateUserBookingDto): Promise<UserBooking> {
    return this.userBookingService.create(createUserDto)
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Update User Booking By Id' })
  @ApiBearerAuth()
  @UseGuards(StaffAuthGuard)
  @ApiCreatedResponseCustom(CreateUserBookingDto)
  @ApiBadResponseCustom(CreateUserBookingDto)
  @ApiUnauthorizedResponseCustom(CreateUserBookingDto)
  async updateUserBooking (
    @Param('id') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserBooking> {
    const existingUB = await this.userBookingService.updateStudent(
      userId,
      updateUserDto,
    )
    return existingUB
  }

  @Get('User')
  @ApiOperation({ summary: 'Get User Booking By Current' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOkResponseCustom(CreateUserBookingDto)
  @ApiBadResponseCustom(CreateUserBookingDto)
  @ApiUnauthorizedResponseCustom(CreateUserBookingDto)
  findCurrent (@Req() request): Promise<UserBooking[]> {
    return this.userBookingService.findCurrent(request.user)
  }

  @Get()
  @ApiOperation({ summary: 'Create User Booking By Query' })
  @ApiBearerAuth()
  @UseGuards(StaffAuthGuard)
  @ApiQuery({
    name: 'mobile',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'centre',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'page',
    type: Number,
    required: false,
    description: 'page',
  })
  @ApiQuery({
    name: 'pageSize',
    type: Number,
    required: false,
    description: 'each page size',
  })
  @ApiOkResponseCustom(CreateUserBookingDto)
  @ApiBadResponseCustom(CreateUserBookingDto)
  @ApiUnauthorizedResponseCustom(CreateUserBookingDto)
  findAll (
    @Query('mobile') mobile: string,
    @Query('centre') centre: string,
    @Query('page') page = 1,
    @Query('pageSize') pageSize = 10,
  ): Promise<{ data: UserBooking[]; totalNumber: number }> {
    return this.userBookingService.findAll(mobile, centre, page, pageSize)
  }

  // @Get(':id')
  // @ApiBearerAuth()
  // @UseGuards(StaffAuthGuard)
  // @ApiOkResponseCustom(CreateUserBookingDto)
  // @ApiBadResponseCustom(CreateUserBookingDto)
  // @ApiUnauthorizedResponseCustom(CreateUserBookingDto)
  // @ApiParam({ name: 'id', description: '', required: true })
  // findById (@Param('id') id: string) {
  //   return this.userBookingService.findAll()
  // }
}
