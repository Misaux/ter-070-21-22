import { Injectable } from '@nestjs/common';
import { FileFormat } from '../utils/file-format.util';
import { ReaderTextService } from './reader-text.service';
import { ReaderAudioService } from './reader-audio.service';
import { ReaderImageService } from './reader-image.service';
import { ReaderVideoService } from './reader-video.service';
import { DataRetriever } from './retrieve-data.service';
import { ComponentDTO } from '../dtos/component.dto';
import { EntryPointDTO } from '../dtos/entry.dto';
import { ReaderHTMLService } from './reader-html.service';
import { ReaderTTSService } from './reader-tts.service';

@Injectable()
export class AggregatorService {

    constructor(private readonly readerTextService: ReaderTextService,
                private readonly readerTTSService: ReaderTTSService,
                private readonly readerAudioService: ReaderAudioService,
                private readonly readerImageService: ReaderImageService,
                private readonly readerVideoService: ReaderVideoService,
                private readonly readerHTMLService: ReaderHTMLService,
                private readonly dataRetriever: DataRetriever)
    {}

    async aggregate(entry: EntryPointDTO): Promise<string>{
        //Parse keyword
        switch (entry.keyword) {
            case "merge_texts":
                return await this.aggregate_merge_texts(entry.components);
            case "text_over_images":
                return await this.aggregate_text_over_images(entry.components);
            default:
                return await this.aggregate_generic(entry.components);
        }
    }

    async aggregate_generic(components: ComponentDTO[]): Promise<string>{
        let resultTags: string = '';

        //Create corresponding tags according to the format and strategy
        for(const elem of components){
            resultTags += '<div>'
            switch (elem.fileFormat){
                case FileFormat.TEXT:
                    resultTags += this.readerTextService.createTags(await this.dataRetriever.getDataFromService(elem));
                    break;
                case FileFormat.TTS:
                    resultTags += this.readerTTSService.createTags(await this.dataRetriever.getDataFromService(elem));
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
                case FileFormat.HTML:
                    //var data = elem.url !== undefined ? await this.dataRetriever.getDataFromService(elem): elem.content;
                    resultTags += this.readerHTMLService.createTags(await this.dataRetriever.getDataFromService(elem));
                    break;
            }
            resultTags += '</div>'
        }

        return resultTags;
    }

    async aggregate_merge_texts(components: ComponentDTO[]): Promise<string>{
        let resultTags: string = '<div>';
        let resultText: string = '';

        for(const elem of components){
            resultText += await this.dataRetriever.getDataFromService(elem);
            resultText += ' '; //Put a space in between texts
        }

        resultTags += this.readerTextService.createTags(resultText);
        resultTags += '</div>';
        return resultTags;
    }

    async aggregate_text_over_images(components: ComponentDTO[]): Promise<string>{
        let resultTags: string = '<div>';

        //The text HAS to be the first one in the order of components
        let textTags: string = '<div>'+ (await this.dataRetriever.getDataFromService(components[0])) + '</div>';

        for(const elem of components){
            if(elem.fileFormat === FileFormat.IMAGE){ //Make sure we ignore components not being images
                resultTags += this.readerImageService.createTags(await this.dataRetriever.getDataFromService(elem));
                resultTags += textTags;
            }
        }

        resultTags += '</div>';
        return resultTags;
    }
}