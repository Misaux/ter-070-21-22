import { NestFactory } from '@nestjs/core';
import { AudioProviderModule } from './audio-provider.module';

async function bootstrap() {
  const app = await NestFactory.create(AudioProviderModule);
  await app.listen(3003);
}
bootstrap();
