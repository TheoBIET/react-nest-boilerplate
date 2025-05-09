import { Injectable, Logger } from '@nestjs/common';
import { PrismaClient } from '@workspace/prisma';

@Injectable()
export class PrismaService extends PrismaClient {
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    super();
  }

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.debug('✅ Prisma connected successfully');
    } catch (error) {
      this.logger.error('❌ Prisma connection error', error);
      throw error;
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.debug('📴 Prisma disconnected successfully');
  }
}
