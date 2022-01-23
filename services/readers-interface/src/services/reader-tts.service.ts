import { Injectable } from '@nestjs/common';

@Injectable()
export class ReaderTTSService {
    constructor() {}

    createTags(data: string) : string{
        return '<input type="button" value="Start" onclick="speakTTS(`'+ data +'`)"> </input>'
    }
}