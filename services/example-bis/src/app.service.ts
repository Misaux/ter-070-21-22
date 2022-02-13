import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Logo de polytech / Université Côte d\'Azur'
  }

  getHello2(): string {
    return 'Bienvenu à Polytech'
  }
}
