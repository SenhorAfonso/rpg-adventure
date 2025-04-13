import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Injectable,
  Param,
  Patch,
  Post,
  UsePipes,
} from '@nestjs/common';
import { CreateCharacterRequest } from './dto/request/create.character.request';
import { ValidateCharacterPipe } from '../../pipes/validate.character.pipe';
import { CreateCharacterInputPort } from 'src/Character/core/ports/in/create.character.input.port';
import { CharacterMapper } from './dto/character.mapper';
import { GetAllCharactersInputPort } from 'src/Character/core/ports/in/get.all.characters.input.port';
import { GetCharacterByIdInputPort } from 'src/Character/core/ports/in/get.character.by.id.input.port';
import { UpdateAdventurerNameInputPort } from 'src/Character/core/ports/in/update.character.adventurename.input.port';
import { DeleteCharacterByIdInputPort } from 'src/Character/core/ports/in/delete.character.by.id.input.port';
import { AddMagicItemToCharacterInputPort } from 'src/Character/core/ports/in/add.magic.item.to.character.input.port';
import { RemoveMagicItemFromCharacterInputPort } from 'src/Character/core/ports/in/remove.magic.item.from.character.input.port';
import { GetCharacterAmuletInputPort } from 'src/Character/core/ports/in/get.character.amulet.input.port';

@Injectable()
@Controller('character')
export class CharacterController {
  constructor(
    @Inject('CreateCharacterInputPort')
    private readonly createCharacterUsecase: CreateCharacterInputPort,

    @Inject('GetAllCharactersInputPort')
    private readonly getAllCharactersUsecase: GetAllCharactersInputPort,

    @Inject('GetCharacterByIdInputPort')
    private readonly getCharacterByIdUsecase: GetCharacterByIdInputPort,

    @Inject('UpdateAdventurerNameInputPort')
    private readonly updateCharacterAdventureNameUsecase: UpdateAdventurerNameInputPort,

    @Inject('DeleteCharacterByIdInputPort')
    private readonly deleteCharacterUsecase: DeleteCharacterByIdInputPort,

    @Inject('AddMagicItemToCharacterInputPort')
    private readonly addMagicItemToCharacterUsecase: AddMagicItemToCharacterInputPort,

    @Inject('RemoveMagicItemFromCharacterInputPort')
    private readonly removeMagicItemFromCharacterUsecase: RemoveMagicItemFromCharacterInputPort,

    @Inject('GetCharacterAmuletInputPort')
    private readonly getCharacterAmuletUsecase: GetCharacterAmuletInputPort,
    private readonly characterMapper: CharacterMapper,
  ) {}

  @Post()
  @UsePipes(ValidateCharacterPipe)
  public createCharacter(@Body() request: CreateCharacterRequest) {
    const characterModelIn =
      this.characterMapper.characterRequestToModelIn(request);
    return this.createCharacterUsecase.execute(characterModelIn);
  }

  @Get()
  public getAllCharacters() {
    return this.getAllCharactersUsecase.execute();
  }

  @Get('/:id')
  public getCharacterById(@Param('id') id: string) {
    return this.getCharacterByIdUsecase.execute(id);
  }

  @Patch('/:id')
  public updateAdventureName(
    @Param('id') id: string,
    @Body() request: { adventurerName: string },
  ) {
    return this.updateCharacterAdventureNameUsecase.execute(
      id,
      request.adventurerName,
    );
  }

  @Delete('/:id')
  public deleteCharacter(@Param('id') id: string) {
    return this.deleteCharacterUsecase.execute(id);
  }

  @Post('/:characterId/:magicItemId')
  public addMagicItemToCharacter(
    @Param('characterId') characterId: string,
    @Param('magicItemId') magicItemId: string,
  ) {
    return this.addMagicItemToCharacterUsecase.execute(
      characterId,
      magicItemId,
    );
  }

  @Delete('/:characterId/:magicItemId')
  public removeMagicItemFromCharacter(
    @Param('characterId') characterId: string,
    @Param('magicItemId') magicItemId: string,
  ) {
    return this.removeMagicItemFromCharacterUsecase.execute(
      characterId,
      magicItemId,
    );
  }

  @Get('/:characterId/amulet')
  public getCharacterAmulet(@Param('characterId') characterId: string) {
    return this.getCharacterAmuletUsecase.execute(characterId);
  }
}
