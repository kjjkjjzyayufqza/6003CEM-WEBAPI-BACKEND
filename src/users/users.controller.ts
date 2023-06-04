import {
  Controller,
  Get, UseGuards,
  Req
} from '@nestjs/common'
import { UsersService } from './users.service'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { AuthGuard } from 'src/auth/auth.guard'

@Controller('users')
@ApiTags('user')
export class UsersController {
  constructor (private readonly usersService: UsersService) {}

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  findCurrentUser (@Req() request) {
    return this.usersService.findCurrent(request.user)
  }

}
