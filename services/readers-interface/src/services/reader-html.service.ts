import { Injectable } from '@nestjs/common';

@Injectable()
export class ReaderHTMLService {

    constructor() {}

    createTags(data: string) : string{
         return `<iframe
         title="frame"
         width="99%"
        height="99%"
         src="${data}"
         allow="geolocation *;">
     </iframe>`;

    }
}