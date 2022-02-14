import { IsNotEmpty, IsString } from 'class-validator';

export class HtmlObjectDto {
  @IsNotEmpty()
  @IsString()
  public id : string;

  @IsNotEmpty()
  @IsString()
  public html : string;
}