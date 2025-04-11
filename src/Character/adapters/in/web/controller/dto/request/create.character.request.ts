import { IsArray, IsEnum, IsInt, IsString } from "class-validator"
import { Classes } from "src/Character/adapters/in/enums/classes";

export class CreateCharacterRequest {

    @IsString()
    name: string;

    @IsString()
    aventurerName: string;

    @IsEnum(Classes)
    classe: Classes;

    @IsInt()
    level: number;

    @IsArray()
    magicItens: Array<any>; // TODO: adicionar tipo especifico no array

    @IsInt()
    strenght: number;

    @IsInt()
    defense: number;
}