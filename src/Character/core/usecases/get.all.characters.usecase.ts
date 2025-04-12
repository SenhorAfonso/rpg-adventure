import { Inject, Injectable } from '@nestjs/common';
import { GetAllCharactersInputPort } from '../ports/in/get.all.characters.input.port';
import { CharacterModelOut } from '../domain/models/character.model.out';
import { CharacterPersistenceOutputPort } from '../ports/out/character.persistence.output.port';

@Injectable()
export class GetAllCharactersUsecase implements GetAllCharactersInputPort {
  constructor(
    @Inject('CharacterPersistenceOutputPort')
    private readonly characterPersistenceOutputPort: CharacterPersistenceOutputPort,
  ) {}

  execute(): Promise<CharacterModelOut[]> {
    return this.characterPersistenceOutputPort.getAllCharacters();
  }
}
