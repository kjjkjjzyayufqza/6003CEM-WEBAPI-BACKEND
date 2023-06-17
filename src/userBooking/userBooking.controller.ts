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
  @UseGuards(AuthGuard)
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
  @UseGuards(AuthGuard)
  @ApiQuery({
    name: 'mobile',
    type: String,
    required: false,
  })
  @ApiOkResponse({ type: CreateUserBookingDto })
  @ApiBadRequestResponse({ type: CustomResponse<null> })
  findAll (@Query('mobile') mobile: string) {
    return this.userBookingService.findAll(mobile)
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiParam({ name: 'id', description: '', required: true })
  @ApiOkResponse({ type: CreateUserBookingDto })
  @ApiBadRequestResponse({ type: CustomResponse<null> })
  findById (@Param('id') id: string) {
    return this.userBookingService.findAll()
  }
}
