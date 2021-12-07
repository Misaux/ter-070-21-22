import { Injectable } from '@nestjs/common';
import { EntryPointDTO } from '../dtos/entry.dto';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs';


@Injectable()
export class DataRetriever {

    constructor(private httpService: HttpService) {}

    async getDataFromService(entry: EntryPointDTO){
        const data = await this.httpService.get(entry.url).pipe(map((response) => response.data));
        return data.toPromise().then((value) => {
            return value;
        });
    }
}