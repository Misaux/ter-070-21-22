import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { FileFormat } from '../utils/file-format.util';

export class ComponentDTO{

    @IsNotEmpty()
    @IsString()
    public name: string;

    @IsNotEmpty()
    @IsString()
    public url: string;

    @IsNotEmpty()
    @IsEnum(FileFormat)
    public fileFormat: FileFormat;
}