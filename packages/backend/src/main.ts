import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { Configuration } from './config/configuration';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );

  const configService =
    app.get<ConfigService<Configuration, true>>(ConfigService);
  const port = configService.get('nest.port', { infer: true });

  await app.listen(port);
}
bootstrap();
