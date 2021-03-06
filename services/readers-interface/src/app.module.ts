import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ReadersController } from './controllers/readers.controller';
import { ReaderTextService } from './services/reader-text.service';
import Configuration from './config/configuration';
import { ReaderImageService } from './services/reader-image.service';
import { ReaderAudioService } from './services/reader-audio.service';
import { ReaderVideoService } from './services/reader-video.service';
import { RenderGateway } from './websocket/render.gateway';
import { HttpModule } from '@nestjs/axios';
import { DataRetriever } from './services/retrieve-data.service';
import { AggregatorService } from './services/aggregator.service';
import { ReaderHTMLService } from './services/reader-html.service';
import {ReaderTTSService} from "./services/reader-tts.service";
import { PersistanceService } from './services/persistance.service';

@Module({
  imports: [
      HttpModule,
    // Configuration.
    ConfigModule.forRoot({
      load: [Configuration],
    })
  ],
  controllers: [ReadersController],
  providers: [
    // WebSocketGateway
      RenderGateway,
    // Services.
      ReaderTextService,
      ReaderTTSService,
      ReaderImageService,
      ReaderAudioService,
      ReaderVideoService,
      ReaderHTMLService,
      DataRetriever,
    // Aggregation
      AggregatorService,
    // PersistanceService
      PersistanceService,

  ],
  
})
export class AppModule {}