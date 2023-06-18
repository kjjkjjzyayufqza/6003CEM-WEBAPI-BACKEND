import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  UseGuards,
  Query,
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
import { UserBooking } from './userBooking.schema'
import { CustomResponse } from 'src/model'
import { StaffAuthGuard } from 'src/auth/staff-auth.guard'

export class a {
  @ApiProperty({ required: true })
  name: string
}

@ApiTags('booking')
@Controller('userBooking')
export class UserBookingController {
  constructor (private readonly userBookingService: UserBookingService) {}

  @Post()
  @ApiOperation({ summary: 'Create User Booking' })
  @ApiOkResponse({ type: CreateUserBookingDto })
  @ApiBadRequestResponse({ type: CustomResponse<null> })
  create (@Body() createUserDto: CreateUserBookingDto): Promise<UserBooking> {
    return this.userBookingService.create(createUserDto)
  }

  @Put('/:id')
  @ApiBearerAuth()
  @UseGuards(StaffAuthGuard)
  @ApiOkResponse({ type: CreateUserBookingDto })
  @ApiBadRequestResponse({ type: CustomResponse<null> })
  async updateUserBooking (
    @Param('id') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const existingUB = await this.userBookingService.updateStudent(
      userId,
      updateUserDto,
    )
    return existingUB
  }

  @Get()
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
  @ApiOkResponse({ type: CreateUserBookingDto })
  @ApiBadRequestResponse({ type: CustomResponse<null> })
  findAll (@Query('mobile') mobile: string, @Query('centre') centre: string) {
    return this.userBookingService.findAll(mobile, centre)
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(StaffAuthGuard)
  @ApiParam({ name: 'id', description: '', required: true })
  @ApiOkResponse({ type: CreateUserBookingDto })
  @ApiBadRequestResponse({ type: CustomResponse<null> })
  findById (@Param('id') id: string) {
    return this.userBookingService.findAll()
  }
}
