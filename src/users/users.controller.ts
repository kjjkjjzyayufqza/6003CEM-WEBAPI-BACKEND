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
import { CreateFavouritesDto, UpdateFavouritesDto } from './dto/index.dto'
import { FavouritesDocument } from './users.schema'

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
