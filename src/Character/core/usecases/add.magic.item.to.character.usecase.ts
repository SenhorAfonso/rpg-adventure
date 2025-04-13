import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AddMagicItemToCharacterInputPort } from '../ports/in/add.magic.item.to.character.input.port';
import { CharacterPersistenceOutputPort } from '../ports/out/character.persistence.output.port';
import { MagicItemPersistenceOutputPort } from 'src/MagicItem/core/ports/out/magic.item.persistence.output.port';
import { MagicItemModelOut } from 'src/MagicItem/core/domain/models/magic.item.model.out';

@Injectable()
export class AddMagicItemToCharacterUsecase
  implements AddMagicItemToCharacterInputPort
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

    if (magicItem.itemType === 'AMULET') {
      const amulets = character.magicItems.filter(
        (item: MagicItemModelOut) => item.itemType === 'AMULET',
      );

      if (amulets) {
        throw new BadRequestException(
          `Character can not have more than one amulet`,
        );
      }
    }

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

    await this.characterPersistenceAdapter.addMagicItem(
      characterId,
      magicItemId,
    );
  }
}
