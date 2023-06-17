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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { StaffAuthGuard } from 'src/auth/staff-auth.guard'

@Controller('news')
@ApiTags('news')
export class NewsController {
  constructor (private readonly newsService: NewsService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(StaffAuthGuard)
  create (@Body() createNewsDto: CreateNewsDto) {
    return this.newsService.create(createNewsDto)
  }

  @Get()
  find (): Promise<CreateNewsDto[]> {
    return this.newsService.find()
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(StaffAuthGuard)
  update (@Param('id') id: string, @Body() updateNewsDto: UpdateNewsDto) {
    return this.newsService.update(id, updateNewsDto)
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(StaffAuthGuard)
  remove (@Param('id') id: string) {
    return this.newsService.remove(id)
  }
}
