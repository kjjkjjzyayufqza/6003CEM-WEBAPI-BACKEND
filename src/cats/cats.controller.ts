import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Put,
  ParseArrayPipe,
  UseGuards,
} from '@nestjs/common'
import { CatsService } from './cats.service'
import { CreateCatDto, UpdateCatDto } from './dto/create-cat.dto'
import { ApiBearerAuth, ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger'
import { CatDocument } from './cats.schema'
import { CentreEnum, GenderEnum } from 'src/main2'
import { StaffAuthGuard } from 'src/auth/staff-auth.guard'

@Controller('cats')
@ApiTags('cats')
export class CatsController {
  constructor (private readonly catsService: CatsService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(StaffAuthGuard)
  @ApiBody({ type: [CreateCatDto] })
  create (
    @Body(new ParseArrayPipe({ items: CreateCatDto }))
    createCatDto: CreateCatDto[],
  ) {
    return this.catsService.create(createCatDto)
  }

  @Get()
  @ApiQuery({
    name: 'id',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'name',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'centre',
    enum: CentreEnum,
    required: false,
  })
  @ApiQuery({
    name: 'adopted',
    type: Boolean,
    required: false,
  })
  @ApiQuery({
    name: 'page',
    type: Number,
    required: false,
    description: 'page',
  })
  @ApiQuery({
    name: 'pageSize',
    type: Number,
    required: false,
    description: 'each page size',
  })
  findAll (
    @Query('id') id: String,
    @Query('name') name: String,
    @Query('centre') centre: CentreEnum,
    @Query('gender') gender: GenderEnum,
    @Query('adopted') adopted: Boolean,
    @Query('page') page = 1,
    @Query('pageSize') pageSize = 10,
  ): Promise<CatDocument[]> {
    return this.catsService.find(
      id,
      name,
      centre,
      gender,
      adopted,
      page,
      pageSize,
    )
  }

  @Put('/:id')
  @ApiBearerAuth()
  @UseGuards(StaffAuthGuard)
  async update (
    @Param('id') id: string,
    @Body() updateCatDto: UpdateCatDto,
  ): Promise<CatDocument> {
    return await this.catsService.update(id, updateCatDto)
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(StaffAuthGuard)
  remove (@Param('id') id: string) {
    return this.catsService.remove(id)
  }
}
