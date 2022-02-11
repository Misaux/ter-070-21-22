import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, map } from 'rxjs';
import { ComponentDTO } from '../dtos/component.dto';


@Injectable()
export class DataRetriever {

    constructor(private httpService: HttpService) {}

    async getDataFromService(cmpDto: ComponentDTO){
            await firstValueFrom(this.httpService.get(cmpDto.url))
            .then(data =>{ 
                return data})
           return null
            
    }
}