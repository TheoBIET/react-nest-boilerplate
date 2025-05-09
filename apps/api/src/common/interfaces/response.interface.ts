import { EStatus } from '../enums';

export interface IApiResponse<T = unknown> {
  code: number;
  status: EStatus;
  message: string;
  data?: T;
}

export interface IApiCustomResponse<T> {
  message: string;
  data: T;
}
