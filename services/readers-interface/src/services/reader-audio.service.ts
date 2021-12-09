import {Injectable} from '@nestjs/common';

@Injectable()
export class ReaderAudioService {

  constructor() {}

  createTags(audioUrl: string) {
    return `
    <audio controls src="${audioUrl}">
        Your browser does not support the <code>audio</code> element.
    </audio>`
  }
}
