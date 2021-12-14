import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs';
import { ComponentDTO } from '../dtos/component.dto';


@Injectable()
export class DataRetriever {

    constructor(private httpService: HttpService) {}

    async getDataFromService(cmpDto: ComponentDTO){
        const data = await this.httpService.get(cmpDto.url).pipe(map((response) => response.data));
        return data.toPromise().then((value) => {
            return value;
        });
    }
}