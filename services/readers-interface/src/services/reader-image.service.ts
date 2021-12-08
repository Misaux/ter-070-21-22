import { Injectable } from '@nestjs/common';

@Injectable()
export class ReaderImageService {

    constructor() {}

    createTags(data: string) : string{
        return '<img class="img" src="' + data + '" alt="Img">';
    }
}
