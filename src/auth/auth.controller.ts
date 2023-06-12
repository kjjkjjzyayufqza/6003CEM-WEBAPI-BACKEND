import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { ApiBearerAuth, ApiOAuth2, ApiParam, ApiTags } from '@nestjs/swagger'
import { AuthDto, AuthRefreshDto } from './dto/index.dto'
import { CreateUserDto, UserDto } from 'src/users/dto/index.dto'
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard'
import { AuthGuard } from './auth.guard'
import {
  CreateStaffUserDto,
  CreateStaffUserNoCentreDto,
} from 'src/staff-user/dto/create-staff-user.dto'
import { CentreCodeEnum } from 'src/index.interface'

@Controller('auth')
@ApiTags('authentication')
// @ApiOAuth2(['write', 'read', 'update'])
// @UseGuards(AccessTokenGuard)
export class AuthController {
  constructor (private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('RegisterPublic')
  StaffRegister (@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto)
  }

  @HttpCode(HttpStatus.OK)
  @Post('RegisterStaff:code')
  @ApiParam({
    name: 'code',
    type: String,
    required: true,
  })
  register (
    @Param('code') code: string,
    @Body() createStaffUserDto: CreateStaffUserNoCentreDto,
  ) {
    return this.authService.signUpStaff(code, createStaffUserDto)
  }

  @HttpCode(HttpStatus.OK)
  @Post('SignInPublic')
  PublicSignIn (@Body() publicSignInDto: AuthDto) {
    return this.authService.signIn(publicSignInDto)
  }

  @HttpCode(HttpStatus.OK)
  @Post('SignInStaff')
  SignIn (@Body() signInDto: AuthDto) {
    return this.authService.signIn(signInDto)
  }

  @HttpCode(HttpStatus.OK)
  @Post('Refresh')
  refresh (@Body() refreshDto: AuthRefreshDto) {
    return this.authService.updateRefreshToken(refreshDto.refreshToken)
  }

  @Get('logout')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  logout (@Req() request) {
    this.authService.logout(request.user['sub'])
  }
}
