import { Inject, Injectable } from '@nestjs/common';
import { CharacterPersistenceOutputPort } from '../ports/out/character.persistence.output.port';
import { UpdateAdventurerNameInputPort } from '../ports/in/update.character.adventurename.input.port';

@Injectable()
export class UpdateAdventurerNameUsecase
  implements UpdateAdventurerNameInputPort
{
  constructor(
    @Inject('CharacterPersistenceOutputPort')
    private readonly characterPersistenceOutputPort: CharacterPersistenceOutputPort,
  ) {}

  async execute(characterId: string, newName: string): Promise<void> {
    await this.characterPersistenceOutputPort.updateCharacterAdventureName(
      characterId,
      newName,
    );
  }
}
