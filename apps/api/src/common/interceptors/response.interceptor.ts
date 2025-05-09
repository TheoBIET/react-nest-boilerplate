import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EStatus } from '../enums';
import { IApiCustomResponse, IApiResponse } from '../interfaces';

function isCustomResponse<T>(result: unknown): result is IApiCustomResponse<T> {
  if (typeof result !== 'object' || result === null) return false;
  const maybeResponse = result as Partial<IApiCustomResponse<unknown>>;

  return (
    Object.prototype.hasOwnProperty.call(maybeResponse, 'message') &&
    Object.prototype.hasOwnProperty.call(maybeResponse, 'data') &&
    typeof maybeResponse.message === 'string'
  );
}

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, IApiResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<IApiResponse<T>> {
    const response: Response = context.switchToHttp().getResponse<Response>();
    const code = response.statusCode;

    return next.handle().pipe(
      map((result: T | IApiCustomResponse<T>): IApiResponse<T> => {
        if (isCustomResponse<T>(result)) {
          return {
            code,
            status: EStatus.OK,
            message: result.message,
            data: result.data,
          };
        }

        return {
          code,
          status: EStatus.OK,
          message: 'Request successful',
          ...(result !== undefined ? { data: result } : {}),
        };
      }),
    );
  }
}
