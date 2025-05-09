import { Controller, Get } from '@nestjs/common';
import { StatusService } from './status.service';
import { ControllerReturn } from 'src/common/types';
import { EStatus } from 'src/common/enums';

@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Get()
  getStatus(): ControllerReturn<{ status: EStatus }> {
    const data = this.statusService.getStatus();

    return {
      message: 'API is running',
      data,
    };
  }
}
