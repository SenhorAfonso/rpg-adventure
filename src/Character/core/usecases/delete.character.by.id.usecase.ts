import { Inject, Injectable } from '@nestjs/common';
import { CharacterPersistenceOutputPort } from '../ports/out/character.persistence.output.port';
import { DeleteCharacterByIdInputPort } from '../ports/in/delete.character.by.id.input.port';

@Injectable()
export class DeleteCharacterByIdUseCase
  implements DeleteCharacterByIdInputPort
{
  constructor(
    @Inject('CharacterPersistenceOutputPort')
    private readonly characterPersistenceOutputPort: CharacterPersistenceOutputPort,
  ) {}

  execute(characterId: string): Promise<void> {
    return this.characterPersistenceOutputPort.deleteCharacter(characterId);
  }
}
