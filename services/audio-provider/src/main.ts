import { NestFactory } from '@nestjs/core';
import { AudioProviderModule } from './audio-provider.module';

async function bootstrap() {
  const app = await NestFactory.create(AudioProviderModule);
  await app.listen(process.env.PORT || 3004);
}
bootstrap();
