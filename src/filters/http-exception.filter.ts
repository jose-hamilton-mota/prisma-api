import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';

//https://docs.nestjs.com/exception-filters#built-in-http-exceptions
@Catch(HttpException)
export class HttpExceptionFilter<T extends HttpException> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    const error = typeof response == 'string' ?
                            {message: exceptionResponse}
                            :
                            (exceptionResponse as object);

    response.status(status).json({
      ... error, // <- passa tudo que está dentro do error
      timestamp: new Date().toISOString(),
    });
  }
}
