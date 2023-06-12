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
} from '@nestjs/common'
import { CatsService } from './cats.service'
import { CreateCatDto, UpdateCatDto } from './dto/create-cat.dto'
import { ApiQuery, ApiTags } from '@nestjs/swagger'
import { CatDocument } from './cats.schema'
import { CentreEnum } from 'src/interfaces/index.interface'

@Controller('cats')
@ApiTags('cats')
export class CatsController {
  constructor (private readonly catsService: CatsService) {}

  @Post()
  create (@Body() createCatDto: CreateCatDto) {
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
  findAll (
    @Query('id') id: String,
    @Query('name') name: String,
    @Query('centre') centre: CentreEnum,
    @Query('adopted') adopted: Boolean,
  ): Promise<CatDocument[]> {
    return this.catsService.find(id, name, centre, adopted)
  }

  @Put('/:id')
  async update (
    @Param('id') id: string,
    @Body() updateCatDto: UpdateCatDto,
  ): Promise<CatDocument> {
    return await this.catsService.update(id, updateCatDto)
  }

  @Delete(':id')
  remove (@Param('id') id: string) {
    return this.catsService.remove(id)
  }
}
