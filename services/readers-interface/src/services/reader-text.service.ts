import { Injectable } from '@nestjs/common';

@Injectable()
export class ReaderTextService {

    constructor() {}

    createTags(data: string) : string{
        return "<p>" + data + "</p>"
    }
}
