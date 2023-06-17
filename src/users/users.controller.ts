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
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger'
import { AuthGuard } from 'src/auth/auth.guard'
import {
  CreateFavouritesDto,
  UpdateFavouritesDto,
  UpdateUserDto,
} from './dto/index.dto'
import { FavouritesDocument, UserDocument } from './users.schema'

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

  @Put('')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async update (
    @Req() request,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserDocument> {
    return await this.usersService.update(request.user.sub, updateUserDto)
  }

  @Get('Favourites')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  getFavourites (@Req() request): Promise<FavouritesDocument> {
    return this.usersService.getFavourites(request.user)
  }

  @Post('Favourites')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiBody({ type: CreateFavouritesDto })
  addFavourites (
    @Req() request,
    @Body() createFavouritesDto: CreateFavouritesDto,
  ) {
    return this.usersService.addFavourites(request.user, createFavouritesDto)
  }
}
