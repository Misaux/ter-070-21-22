import { Injectable } from '@nestjs/common';

@Injectable()
export class ReaderTTSService {
    constructor() {}

    createTags(data: string) : string{
        return '<p class="tts" onclick="speakTTS(`'+ data +'`)"> '+data+'</p>'
    }
}