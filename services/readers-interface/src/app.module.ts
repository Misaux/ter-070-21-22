import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ReadersController } from './controllers/readers.controller';
import { ReaderTextService } from './services/reader-text.service';
import Configuration from './config/configuration';
import { ReaderImageService } from './services/reader-image.service';
import { ReaderAudioService } from './services/reader-audio.service';
import { ReaderVideoService } from './services/reader-video.service';
import { RenderGateway } from './websocket/render.gateway';

@Module({
  imports: [
    // Configuration.
    ConfigModule.forRoot({
      load: [Configuration],
    })
  ],
  controllers: [ReadersController],
  providers: [
    // Services.
      ReaderTextService,
      ReaderImageService,
      ReaderAudioService,
      ReaderVideoService,
    // WebSocketGateway
      RenderGateway,
      
  ],
})
export class AppModule {}