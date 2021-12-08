import { Test, TestingModule } from '@nestjs/testing';
import { AudioProviderController } from './audio-provider.controller';
import { AudioProviderService } from './audio-provider.service';

describe('AppController', () => {
  let audiopController: AudioProviderController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AudioProviderController],
      providers: [AudioProviderService],
    }).compile();

    audiopController = app.get<AudioProviderController>(AudioProviderController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(audiopController.getHello()).toBe('Hello World!');
    });
  });
});
