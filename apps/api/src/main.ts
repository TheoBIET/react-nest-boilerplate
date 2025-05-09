import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { EnvService } from './core/env/env.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const envService = app.get(EnvService);
  const port = envService.get('API_PORT');
  const host = envService.get('API_HOST');
  const prefix = envService.get('API_PREFIX');

  app.setGlobalPrefix(prefix);

  await app.listen(port, host);
  Logger.debug(
    `🚀 Application is running on: http://${host}:${port}/${prefix}`,
  );
}
void bootstrap();
