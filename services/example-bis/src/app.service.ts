import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'https://pbs.twimg.com/profile_images/1219168859233538049/zZ55FE9E_400x400.png';
    //return 'D:\\Enzo\\Pictures\\PP\\kaloud';
  }
}
