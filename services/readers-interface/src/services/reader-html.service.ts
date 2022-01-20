import { Injectable } from '@nestjs/common';

@Injectable()
export class ReaderHTMLService {

    constructor() {}

    createTags(data: string) : string{
    //     return `<iframe
    //     title="frame"
    //     width="500px"
    //     height="500px"
    //     src="${data}"
    //     allow="geolocation *;">
    // </iframe>`;
    return `${data}`;
    }
}