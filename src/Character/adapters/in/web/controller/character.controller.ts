import { Body, Controller, Get, Injectable, Patch, Post } from "@nestjs/common";
import { CreateCharacterRequest } from "./dto/request/create.character.request";

@Injectable()
@Controller('character')
export class CharacterController {

    public constructor() {

    }

    @Post()
    public createCharacter(@Body() newCharacter: CreateCharacterRequest) {
        return newCharacter;
    }

    @Get()
    public getAllCharacters() {

    }

    @Get('/:id')
    public getCharacterById() {

    }

    @Patch('/:id/:newName')
    public updateAdventureName() {

    }

}