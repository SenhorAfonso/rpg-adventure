import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CharacterPersistenceOutputPort } from '../ports/out/character.persistence.output.port';
import { DeleteCharacterByIdInputPort } from '../ports/in/delete.character.by.id.input.port';
import { MagicItemModelOut } from 'src/MagicItem/core/domain/models/magic.item.model.out';
import { MagicItemPersistenceOutputPort } from 'src/MagicItem/core/ports/out/magic.item.persistence.output.port';

@Injectable()
export class DeleteCharacterByIdUseCase
  implements DeleteCharacterByIdInputPort
{
  constructor(
    @Inject('CharacterPersistenceOutputPort')
    private readonly characterPersistenceOutputPort: CharacterPersistenceOutputPort,
    @Inject('MagicItemPersistenceOutputPort')
    private readonly magicItemPersistenceOutputPort: MagicItemPersistenceOutputPort,
  ) {}

  async execute(characterId: string): Promise<void> {
    const character =
      await this.characterPersistenceOutputPort.getCharacterById(characterId);

    if (!character) {
      throw new NotFoundException(`Character with id ${characterId} not found`);
    }

    const characterItems = (character.magicItems as MagicItemModelOut[]).map(
      (item) => item.id,
    );

    await this.characterPersistenceOutputPort.deleteCharacter(characterId);
    await this.magicItemPersistenceOutputPort.updateItemOwner(
      characterItems,
      null,
    );
  }
}
