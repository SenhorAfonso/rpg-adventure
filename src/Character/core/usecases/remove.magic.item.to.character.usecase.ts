import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CharacterPersistenceOutputPort } from '../ports/out/character.persistence.output.port';
import { MagicItemPersistenceOutputPort } from 'src/MagicItem/core/ports/out/magic.item.persistence.output.port';
import { RemoveMagicItemFromCharacterInputPort } from '../ports/in/remove.magic.item.to.character.input.port';

@Injectable()
export class RemoveMagicItemToCharacterUsecase
  implements RemoveMagicItemFromCharacterInputPort
{
  constructor(
    @Inject('CharacterPersistenceOutputPort')
    private readonly characterPersistenceAdapter: CharacterPersistenceOutputPort,
    @Inject('MagicItemPersistenceOutputPort')
    private readonly magicItemPersistenceAdapter: MagicItemPersistenceOutputPort,
  ) {}

  async execute(characterId: string, magicItemId: string): Promise<void> {
    const character =
      await this.characterPersistenceAdapter.getCharacterById(characterId);

    if (!character) {
      throw new NotFoundException(`Character with id ${characterId} not found`);
    }

    const magicItem =
      await this.magicItemPersistenceAdapter.getById(magicItemId);

    if (!magicItem) {
      throw new NotFoundException(
        `Magic item with id ${magicItemId} not found`,
      );
    }

    if (magicItem.owner) {
      throw new NotFoundException(
        `Magic item with id ${magicItemId} already has an owner`,
      );
    }

    await this.characterPersistenceAdapter.removeCharacterMagicItem(
      characterId,
      magicItemId,
    );
  }
}
