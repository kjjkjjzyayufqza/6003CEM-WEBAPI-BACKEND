import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Res,
  UseGuards,
  Query,
} from '@nestjs/common'
import {
  CreateEncryptedUserBookingDto,
  CreateUserBookingDto,
  UpdateUserDto,
} from './dto/index.dto'
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { UserBookingService } from './userBooking.service'
import { AuthGuard } from 'src/auth/auth.guard'

@ApiTags('booking')
@Controller('userBooking')
export class UserBookingController {
  constructor (private readonly userBookingService: UserBookingService) {}

  @Post()
  @ApiOperation({ summary: 'summary goes here' })
  @ApiResponse({
    status: 200,
    description: 'description goes here',
    schema: {
      example: 'hello',
    },
  })
  create (@Body() createUserDto: CreateEncryptedUserBookingDto) {
    return this.userBookingService.createEncryptedData(createUserDto)
  }

  @Put('/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
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
  findAll (@Query('mobile') mobile: string) {
    return this.userBookingService.findAll(mobile)
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiParam({ name: 'id', description: '', required: true })
  findById (@Param('id') id: string) {
    return this.userBookingService.findAll()
  }
}
