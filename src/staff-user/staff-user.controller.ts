import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Put,
} from '@nestjs/common'
import { StaffUserService } from './staff-user.service'
import {
  CreateStaffUserDto,
  UpdateStaffUserDto,
} from './dto/create-staff-user.dto'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { StaffAuthGuard } from 'src/auth/staff-auth.guard'
import { StaffUserDocument } from './staff-user.schema'
import {
  ApiOkResponseCustom,
  ApiBadResponseCustom,
  ApiUnauthorizedResponseCustom,
  ApiCreatedResponseCustom,
} from 'src/model'
import { CreateUserBookingDto } from 'src/userBooking/dto/index.dto'

@Controller('staff-user')
@ApiTags('staffUser')
export class StaffUserController {
  constructor (private readonly staffUserService: StaffUserService) {}

  @Get()
  @ApiOperation({ summary: 'Get Staff Profile' })
  @ApiBearerAuth()
  @UseGuards(StaffAuthGuard)
  @ApiOkResponseCustom(CreateStaffUserDto)
  @ApiBadResponseCustom(CreateStaffUserDto)
  @ApiUnauthorizedResponseCustom(CreateStaffUserDto)
  findCurrentUser (@Req() request) {
    return this.staffUserService.findCurrentStaff(request.user)
  }

  @Put()
  @ApiOperation({ summary: 'Update Staff Profile' })
  @ApiBearerAuth()
  @UseGuards(StaffAuthGuard)
  @ApiOkResponseCustom(CreateStaffUserDto)
  @ApiCreatedResponseCustom(CreateStaffUserDto)
  @ApiBadResponseCustom(CreateStaffUserDto)
  @ApiUnauthorizedResponseCustom(CreateStaffUserDto)
  async update (
    @Req() request,
    @Body() updateStaffUserDto: UpdateStaffUserDto,
  ): Promise<StaffUserDocument> {
    return await this.staffUserService.update(
      request.user.sub,
      updateStaffUserDto,
    )
  }
}
