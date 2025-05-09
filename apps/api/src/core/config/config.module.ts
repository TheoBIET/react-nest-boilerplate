import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { EnvService } from 'src/core/env/env.service';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.local'],
      validate: EnvService.validate,
    }),
  ],
  providers: [EnvService],
  exports: [EnvService],
})
export class ConfigModule {}
