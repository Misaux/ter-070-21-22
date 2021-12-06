import { Injectable } from '@nestjs/common';
import { EntryPointDTO } from '../dtos/entry.dto';

@Injectable()
export class ReaderTextService {

    constructor() {}

    getCorrespondingTags(entry: EntryPointDTO): string{
        return entry.name;
    }
}
