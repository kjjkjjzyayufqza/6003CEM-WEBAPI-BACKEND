import { Controller, Get, HttpStatus, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  redirect(@Res() res) {
    return res.redirect('/api');
  }


  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }


  @Get('/nihao')
  getHello2(): string {
    return '你好1';
  }

  @Get('/nihao3')
  getHello3(): string {
    return '你好3';
  }
}
