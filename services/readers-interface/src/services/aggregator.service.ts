import { Injectable } from '@nestjs/common';
import { FileFormat } from '../utils/file-format.util';
import { ReaderTextService } from './reader-text.service';
import { ReaderAudioService } from './reader-audio.service';
import { ReaderImageService } from './reader-image.service';
import { ReaderVideoService } from './reader-video.service';
import { DataRetriever } from './retrieve-data.service';
import { ComponentDTO } from '../dtos/component.dto';

@Injectable()
export class AggregatorService {

    constructor(private readonly readerTextService: ReaderTextService,
                private readonly readerAudioService: ReaderAudioService,
                private readonly readerImageService: ReaderImageService,
                private readonly readerVideoService: ReaderVideoService,
                private readonly dataRetriever: DataRetriever)
    {}

    async aggregate(entries: ComponentDTO[]): Promise<string>{
        let resultTags: string = '';

        //Create corresponding tags according to the format and strategy
        for(const elem of entries){
            resultTags += '<div>'
            switch (elem.fileFormat){
                case FileFormat.TEXT:
                    resultTags += this.readerTextService.createTags(await this.dataRetriever.getDataFromService(elem));
                    break;
                case FileFormat.IMAGE:
                    resultTags += this.readerImageService.createTags(await this.dataRetriever.getDataFromService(elem));
                    break;
                case FileFormat.AUDIO:
                    resultTags += this.readerAudioService.createTags(elem.url);
                    break;
                case FileFormat.VIDEO:
                    resultTags += this.readerVideoService.createTags(elem.url);
                    break;
            }
            resultTags += '</div>'
        }

        return resultTags;
    }
}