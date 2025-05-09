import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { z } from 'zod';
import { schema } from './env.schema';

type EnvVars = z.infer<typeof schema>;

@Injectable()
export class EnvService {
  constructor(private configService: ConfigService) {}

  static validate = (config: Record<string, unknown>) => {
    const parsed = schema.safeParse(config);

    if (!parsed.success) {
      console.error('❌ Invalid environment variables:', parsed.error.format());
      process.exit(1);
    }

    return parsed.data;
  };

  get<K extends keyof EnvVars>(key: K): EnvVars[K] {
    const value = this.configService.get<EnvVars[K]>(key);
    if (value === undefined) {
      throw new Error(`Config error: ${String(key)} is not defined`);
    }
    return value;
  }

  get isProduction(): boolean {
    return this.get('NODE_ENV') === 'production';
  }
}
