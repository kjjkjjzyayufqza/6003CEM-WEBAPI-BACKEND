import {
  Controller,
  Get,
  UseGuards,
  Req,
  Post,
  Put,
  Param,
  Body,
  ParseArrayPipe,
} from '@nestjs/common'
import { UsersService } from './users.service'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger'
import { AuthGuard } from 'src/auth/auth.guard'
import {
  CreateFavouritesDto,
  FavouritesDto,
  UpdateFavouritesDto,
  UpdateUserDto,
  UserDto,
} from './dto/index.dto'
import { FavouritesDocument, UserDocument } from './users.schema'
import {
  ApiBadResponseCustom,
  ApiCreatedResponseCustom,
  ApiOkResponseCustom,
  ApiUnauthorizedResponseCustom,
} from 'src/model'

@Controller('users')
@ApiTags('user')
export class UsersController {
  constructor (private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Get User Profile' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOkResponseCustom(UserDto)
  @ApiBadResponseCustom(UserDto)
  @ApiUnauthorizedResponseCustom(UserDto)
  findCurrentUser (@Req() request) {
    return this.usersService.findCurrent(request.user)
  }

  @Put('')
  @ApiOperation({ summary: 'Update User Profile' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiCreatedResponseCustom(UpdateUserDto)
  @ApiBadResponseCustom(UpdateUserDto)
  @ApiUnauthorizedResponseCustom(UpdateUserDto)
  async update (
    @Req() request,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserDocument> {
    return await this.usersService.update(request.user.sub, updateUserDto)
  }

  @Get('Favourites')
  @ApiOperation({ summary: 'Get User Favourites' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOkResponseCustom(FavouritesDto)
  @ApiBadResponseCustom(FavouritesDto)
  @ApiUnauthorizedResponseCustom(FavouritesDto)
  getFavourites (@Req() request): Promise<FavouritesDto> {
    return this.usersService.getFavourites(request.user)
  }

  @Post('Favourites')
  @ApiOperation({ summary: 'Update User Favourites' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiBody({ type: CreateFavouritesDto })
  @ApiCreatedResponseCustom(CreateFavouritesDto)
  @ApiBadResponseCustom(CreateFavouritesDto)
  @ApiUnauthorizedResponseCustom(CreateFavouritesDto)
  addFavourites (
    @Req() request,
    @Body() createFavouritesDto: CreateFavouritesDto,
  ) {
    return this.usersService.addFavourites(request.user, createFavouritesDto)
  }
}
