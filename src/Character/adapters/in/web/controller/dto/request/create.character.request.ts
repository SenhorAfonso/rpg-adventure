import { IsArray, IsEnum, IsInt, IsString } from 'class-validator';
import { Classes } from 'src/Character/adapters/in/enums/classes';

export class CreateCharacterRequest {
  @IsString()
  name: string;

  @IsString()
  adventurerName: string;

  @IsEnum(Classes)
  classe: Classes;

  @IsInt()
  level: number;

  @IsArray()
  magicItems: Array<string>;

  @IsInt()
  strength: number;

  @IsInt()
  defense: number;
}
