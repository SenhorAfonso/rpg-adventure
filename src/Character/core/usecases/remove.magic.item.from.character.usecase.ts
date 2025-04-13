import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CharacterPersistenceOutputPort } from '../ports/out/character.persistence.output.port';
import { MagicItemPersistenceOutputPort } from 'src/MagicItem/core/ports/out/magic.item.persistence.output.port';
import { RemoveMagicItemFromCharacterInputPort } from '../ports/in/remove.magic.item.from.character.input.port';
import { MagicItemModelOut } from 'src/MagicItem/core/domain/models/magic.item.model.out';

@Injectable()
export class RemoveMagicItemFromCharacterUsecase
  implements RemoveMagicItemFromCharacterInputPort
{
  constructor(
    @Inject('CharacterPersistenceOutputPort')
    private readonly characterPersistenceAdapter: CharacterPersistenceOutputPort,
    @Inject('MagicItemPersistenceOutputPort')
    private readonly magicItemPersistenceAdapter: MagicItemPersistenceOutputPort,
  ) {}

  async execute(characterId: string, magicItemId: string): Promise<void> {
    if (!characterId) {
      return this.removeMagicItemFromAllCharacters(magicItemId);
    }

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

    await this.characterPersistenceAdapter.removeCharacterMagicItem(
      characterId,
      magicItemId,
    );
  }

  private async removeMagicItemFromAllCharacters(itemId: string) {
    const allCharacters =
      await this.characterPersistenceAdapter.getAllCharacters();

    allCharacters.forEach((character) => {
      Promise.all(
        character.magicItems.map(async (item: MagicItemModelOut | string) => {
          if (item === itemId) {
            await this.characterPersistenceAdapter.removeCharacterMagicItem(
              character.id,
              item,
            );
          }
        }),
      );
    });
  }
}
