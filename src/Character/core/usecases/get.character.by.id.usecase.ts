import { Inject, Injectable } from '@nestjs/common';
import { CharacterModelOut } from '../domain/models/character.model.out';
import { CharacterPersistenceOutputPort } from '../ports/out/character.persistence.output.port';
import { GetCharacterByIdInputPort } from '../ports/in/get.character.by.id.input.port';

@Injectable()
export class GetCharacterByIdUsecase implements GetCharacterByIdInputPort {
  constructor(
    @Inject('CharacterPersistenceOutputPort')
    private readonly characterPersistenceOutputPort: CharacterPersistenceOutputPort,
  ) {}

  execute(characterId: string): Promise<CharacterModelOut> {
    return this.characterPersistenceOutputPort.getCharacterById(characterId);
  }
}
