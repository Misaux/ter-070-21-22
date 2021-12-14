import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ComponentDTO } from './component.dto';

export class EntryPointDTO{

    @IsNotEmpty()
    @IsString()
    public keyword: string;

    @IsNotEmpty()
    @ValidateNested( {each: true})
    @Type(() => ComponentDTO)
    public components: ComponentDTO[];
}