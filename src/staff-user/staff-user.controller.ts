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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { StaffAuthGuard } from 'src/auth/staff-auth.guard'
import { StaffUserDocument } from './staff-user.schema'

@Controller('staff-user')
@ApiTags('staffUser')
export class StaffUserController {
  constructor (private readonly staffUserService: StaffUserService) {}

  @Get()
  @ApiBearerAuth()
  @UseGuards(StaffAuthGuard)
  findCurrentUser (@Req() request) {
    return this.staffUserService.findCurrentStaff(request.user)
  }

  @Put()
  @ApiBearerAuth()
  @UseGuards(StaffAuthGuard)
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
