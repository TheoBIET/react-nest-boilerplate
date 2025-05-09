import * as os from 'os';
import { Injectable } from '@nestjs/common';
import { EStatus } from '../common/enums';
import { formatUptime } from 'src/common/utils/time.util';

@Injectable()
export class StatusService {
  getStatus() {
    const uptime = formatUptime(process.uptime());

    return {
      status: EStatus.OK,
      version: process.env.npm_package_version,
      uptime,
      platform: os.platform(),
      architecture: os.arch(),
    };
  }
}
