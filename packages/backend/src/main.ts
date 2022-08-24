import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import fastifyCookie from '@fastify/cookie';
import { AppModule } from './app.module';
import { Configuration } from './config/configuration';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );

  const configService =
    app.get<ConfigService<Configuration, true>>(ConfigService);

  // add cookie plugin
  app.register(
    // TODO fix type error
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fastifyCookie as any,
    {
      secret: configService.get('cookie.secret', { infer: true }),
      parseOptions: {
        sameSite: 'lax',
        secure: configService.get('cookie.secure', { infer: true }),
        signed: true,
        httpOnly: true,
      },
    }
  );

  await app.listen(configService.get('nest.port', { infer: true }));
}

bootstrap();
