import { ArgumentsHost, Catch, ExceptionFilter, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
// 全局过滤器
@Catch()
export class AppFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
        });

        Logger.warn(`Data ${JSON.stringify(request.params)} path: ${request.path}`, 'RequestParam');
        Logger.warn(`Data ${JSON.stringify(request.body)} path: ${request.path}`, 'RequestBody');
        Logger.warn(`Data ${JSON.stringify(request.query)} path: ${request.path}`, 'RequestQuery');
        Logger.warn(`Data ${JSON.stringify(request.ip)} path: ${request.path}`, 'RequestIP');
    }
}
