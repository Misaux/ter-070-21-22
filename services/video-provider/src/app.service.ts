import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { createReadStream, statSync } from 'fs';
import {Response,Request} from 'express'
import { join } from 'path';

@Injectable()
export class AppService {
  getVideo( request: Request, response: Response){
    try {
      const range = request.headers.range
      if (!range) {
        response.status(400).send("Requires Range header");
      }
      else{
        const parts = range.substr(6).split('-')
        const path = join(process.cwd(), 'assets/sample-mp4-file.mp4')
        const size =  statSync(path).size;  
        const start = parseInt(parts[0], 10)
        const end = parts[1]
        ? parseInt(parts[1], 10)
        : size-1        
        const contentLength = end - start + 1;
        response.status(206)
        response.header({
          'Accept-Ranges': 'bytes',
          'Content-Type': "video/mp4",
          'Content-Range': `bytes ${start}-${end}/${size}`,
          'Content-Length': end - start + 1,
        })
        const videoStream = createReadStream(path, { start, end });
        videoStream.pipe(response);
      }
    } catch (e) {
      console.error(e)
      throw new ServiceUnavailableException()
    }
  }
}
