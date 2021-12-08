import { Module } from '@nestjs/common';
import { AudioProviderController } from './audio-provider.controller';
import { AudioProviderService } from './audio-provider.service';

@Module({
  imports: [],
  controllers: [AudioProviderController],
  providers: [AudioProviderService],
})
export class AudioProviderModule {}
