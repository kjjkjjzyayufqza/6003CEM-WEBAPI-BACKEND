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
} from '@nestjs/common'
import { StaffUserService } from './staff-user.service'
import { CreateStaffUserDto } from './dto/create-staff-user.dto'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { StaffAuthGuard } from 'src/auth/staff-auth.guard'

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
}
