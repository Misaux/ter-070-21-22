import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { FileFormat } from '../utils/file-format.util';

export class EntryPointDTO{
    @IsNotEmpty()
    @IsString()
    public name: string;

    @IsNotEmpty()
    @IsString()
    public address: string;

    @IsNotEmpty()
    @IsEnum(FileFormat)
    public fileFormat: FileFormat;
}