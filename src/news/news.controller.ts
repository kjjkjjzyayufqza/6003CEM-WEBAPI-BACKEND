import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common'
import { NewsService } from './news.service'
import { CreateNewsDto, UpdateNewsDto } from './dto/create-news.dto'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { StaffAuthGuard } from 'src/auth/staff-auth.guard'
import {
  ApiOkResponseCustom,
  ApiCreatedResponseCustom,
  ApiBadResponseCustom,
  ApiUnauthorizedResponseCustom,
} from 'src/model'

@Controller('news')
@ApiTags('news')
export class NewsController {
  constructor (private readonly newsService: NewsService) {}

  @Post()
  @ApiOperation({ summary: 'Create News' })
  @ApiBearerAuth()
  @UseGuards(StaffAuthGuard)
  @ApiCreatedResponseCustom(CreateNewsDto)
  @ApiBadResponseCustom(CreateNewsDto)
  @ApiUnauthorizedResponseCustom(CreateNewsDto)
  create (@Body() createNewsDto: CreateNewsDto) {
    return this.newsService.create(createNewsDto)
  }

  @Get()
  @ApiOperation({ summary: 'Get All News' })
  @ApiOkResponseCustom(CreateNewsDto)
  @ApiBadResponseCustom(CreateNewsDto)
  @ApiUnauthorizedResponseCustom(CreateNewsDto)
  find (): Promise<CreateNewsDto[]> {
    return this.newsService.find()
  }

  @Put(':id')
  @ApiOperation({ summary: 'Get News By Id' })
  @ApiBearerAuth()
  @UseGuards(StaffAuthGuard)
  @ApiCreatedResponseCustom(CreateNewsDto)
  @ApiBadResponseCustom(CreateNewsDto)
  @ApiUnauthorizedResponseCustom(CreateNewsDto)
  update (@Param('id') id: string, @Body() updateNewsDto: UpdateNewsDto) {
    return this.newsService.update(id, updateNewsDto)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete News By Id' })
  @ApiBearerAuth()
  @UseGuards(StaffAuthGuard)
  @ApiOkResponseCustom(CreateNewsDto)
  @ApiBadResponseCustom(CreateNewsDto)
  @ApiUnauthorizedResponseCustom(CreateNewsDto)
  remove (@Param('id') id: string) {
    return this.newsService.remove(id)
  }
}
