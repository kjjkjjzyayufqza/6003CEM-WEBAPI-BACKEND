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
import {
  ApiBearerAuth,
  ApiOAuth2,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger'
import {
  AuthDto,
  AuthLogoutDto,
  AuthRefreshDto,
  TokenDto,
} from './dto/index.dto'
import { CreateUserDto, UserDto } from 'src/users/dto/index.dto'
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard'
import { AuthGuard } from './auth.guard'
import {
  CreateStaffUserDto,
  CreateStaffUserNoCentreDto,
} from 'src/staff-user/dto/create-staff-user.dto'
import {
  ApiBadResponseCustom,
  ApiCreatedResponseCustom,
  ApiOkResponseCustom,
  ApiUnauthorizedResponseCustom,
  CentreCodeEnum,
} from 'src/model'

@Controller('auth')
@ApiTags('authentication')
// @ApiOAuth2(['write', 'read', 'update'])
// @UseGuards(AccessTokenGuard)
export class AuthController {
  constructor (private authService: AuthService) {}

  @Post('RegisterPublic')
  @ApiOperation({ summary: 'Create Public User Account' })
  @ApiCreatedResponseCustom(TokenDto)
  @ApiBadResponseCustom(TokenDto)
  @ApiUnauthorizedResponseCustom(TokenDto)
  StaffRegister (@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto)
  }

  @Post('RegisterStaff/:code')
  @ApiOperation({ summary: 'Create Staff User Account' })
  @ApiParam({
    name: 'code',
    type: String,
    required: true,
  })
  @ApiCreatedResponseCustom(TokenDto)
  @ApiBadResponseCustom(TokenDto)
  @ApiUnauthorizedResponseCustom(TokenDto)
  register (
    @Param('code') code: string,
    @Body() createStaffUserDto: CreateStaffUserNoCentreDto,
  ) {
    return this.authService.signUpStaff(code, createStaffUserDto)
  }

  @Post('SignInPublic')
  @ApiOperation({ summary: 'Login Public User Account' })
  @ApiCreatedResponseCustom(TokenDto)
  @ApiBadResponseCustom(TokenDto)
  @ApiUnauthorizedResponseCustom(TokenDto)
  PublicSignIn (@Body() publicSignInDto: AuthDto) {
    return this.authService.signIn(publicSignInDto)
  }

  @Post('SignInStaff')
  @ApiOperation({ summary: 'Login Staff User Account' })
  @ApiCreatedResponseCustom(TokenDto)
  @ApiBadResponseCustom(TokenDto)
  @ApiUnauthorizedResponseCustom(TokenDto)
  SignIn (@Body() signInDto: AuthDto) {
    return this.authService.signInStaff(signInDto)
  }

  @Post('RefreshPublic')
  @ApiOperation({ summary: 'Refresh Public User Token' })
  @ApiCreatedResponseCustom(TokenDto)
  @ApiBadResponseCustom(TokenDto)
  @ApiUnauthorizedResponseCustom(TokenDto)
  refreshPublic (@Body() refreshDto: AuthRefreshDto) {
    return this.authService.updateRefreshToken(refreshDto.refreshToken)
  }

  @Post('RefreshStaff')
  @ApiOperation({ summary: 'Refresh Staff User Token' })
  @ApiCreatedResponseCustom(TokenDto)
  @ApiBadResponseCustom(TokenDto)
  @ApiUnauthorizedResponseCustom(TokenDto)
  refreshStaff (@Body() refreshDto: AuthRefreshDto) {
    return this.authService.updateRefreshTokenStaff(refreshDto.refreshToken)
  }

  @Get('logout')
  @ApiOperation({ summary: 'Logout User Account' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOkResponseCustom(AuthLogoutDto)
  @ApiBadResponseCustom(AuthLogoutDto)
  @ApiUnauthorizedResponseCustom(AuthLogoutDto)
  logout (@Req() request) {
    this.authService.logout(request.user['sub'])
  }
}
