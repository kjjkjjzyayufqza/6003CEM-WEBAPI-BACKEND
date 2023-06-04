import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import { Request, Response } from 'express'
@Catch()
export class AllExceptionFilter<T> implements ExceptionFilter {
  catch (exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR

    let message = exception.message
      ? exception.message
      : `${status >= 500 ? 'Service Error' : 'Client Error'}`

    let message_CT: any = undefined
    try {
      message_CT = exception.getResponse()
      if (Array.isArray(message_CT.message)) {
        message = message_CT.message[0]
      }
    } catch (e) {
      
    }

    const errorResponse = {
      data: {},
      message: message,
      statusCode: status,
    }
    // 设置返回的状态码、请求头、发送错误信息
    response.status(status)
    response.header('Content-Type', 'application/json; charset=utf-8')
    response.send(errorResponse)
  }
}
