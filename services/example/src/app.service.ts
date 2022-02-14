import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World from Example 1!';
  }

  getVideoURL() {
    return "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4";
  }

  getAudioURL() {
    return "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3";
  }
}
