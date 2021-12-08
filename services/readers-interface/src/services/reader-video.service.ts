import { Injectable } from '@nestjs/common';

@Injectable()
export class ReaderVideoService {
    
    constructor() {}

    createTags(data: string) : string{
        return `<video id="videoPlayer" width="650" controls muted="muted" autoplay>
                    <source src="${data}" type="video/mp4" />
                </video>`
    }

}
