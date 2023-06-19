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
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger'
import { CatDocument } from './cats.schema'
import {
  ApiBadResponseCustom,
  ApiCreatedResponseCustom,
  ApiOkResponseCustom,
  ApiUnauthorizedResponseCustom,
  CatBreedEnum,
  CentreEnum,
  GenderEnum,
} from 'src/model'
import { StaffAuthGuard } from 'src/auth/staff-auth.guard'

@Controller('cats')
@ApiTags('cats')
export class CatsController {
  constructor (private readonly catsService: CatsService) {}

  @Post()
  @ApiOperation({ summary: 'Create Cat' })
  @ApiBearerAuth()
  @UseGuards(StaffAuthGuard)
  @ApiBody({ type: [CreateCatDto] })
  @ApiCreatedResponseCustom(CreateCatDto)
  @ApiBadResponseCustom(CreateCatDto)
  @ApiUnauthorizedResponseCustom(CreateCatDto)
  create (
    @Body(new ParseArrayPipe({ items: CreateCatDto }))
    createCatDto: CreateCatDto[],
  ) {
    return this.catsService.create(createCatDto)
  }

  @Get()
  @ApiOperation({ summary: 'Find Cat By Query' })
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
    name: 'breed',
    enum: CatBreedEnum,
    required: false,
  })
  @ApiQuery({
    name: 'centre',
    enum: CentreEnum,
    required: false,
  })
  @ApiQuery({
    name: 'gender',
    enum: GenderEnum,
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
  @ApiOkResponseCustom(CreateCatDto)
  @ApiBadResponseCustom(CreateCatDto)
  @ApiUnauthorizedResponseCustom(CreateCatDto)
  findAll (
    @Query('id') id: String,
    @Query('name') name: String,
    @Query('breed') breed: CatBreedEnum,
    @Query('centre') centre: CentreEnum,
    @Query('gender') gender: GenderEnum,
    @Query('adopted') adopted: Boolean,
    @Query('page') page = 1,
    @Query('pageSize') pageSize = 10,
  ): Promise<{ data: CatDocument[]; totalNumber: number }> {
    return this.catsService.find(
      id,
      name,
      breed,
      centre,
      gender,
      adopted,
      page,
      pageSize,
    )
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Update Cat By Id' })
  @ApiBearerAuth()
  @UseGuards(StaffAuthGuard)
  @ApiBadResponseCustom(CreateCatDto)
  @ApiCreatedResponseCustom(CreateCatDto)
  @ApiUnauthorizedResponseCustom(CreateCatDto)
  async update (
    @Param('id') id: string,
    @Body() updateCatDto: UpdateCatDto,
  ): Promise<CatDocument> {
    return await this.catsService.update(id, updateCatDto)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Cat By Id' })
  @ApiBearerAuth()
  @UseGuards(StaffAuthGuard)
  @ApiOkResponseCustom(CreateCatDto)
  @ApiBadResponseCustom(CreateCatDto)
  @ApiUnauthorizedResponseCustom(CreateCatDto)
  remove (@Param('id') id: string) {
    return this.catsService.remove(id)
  }
}
