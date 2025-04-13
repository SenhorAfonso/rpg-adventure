import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { GetCharacterAmuletInputPort } from '../ports/in/get.character.amulet.input.port';
import { MagicItemModelOut } from 'src/MagicItem/core/domain/models/magic.item.model.out';
import { CharacterPersistenceOutputPort } from '../ports/out/character.persistence.output.port';
import { MagicItemPersistenceOutputPort } from 'src/MagicItem/core/ports/out/magic.item.persistence.output.port';

@Injectable()
export class GetCharacterAmuleteUsecase implements GetCharacterAmuletInputPort {
  constructor(
    @Inject('MagicItemPersistenceOutputPort')
    private readonly magicItemPersistenceOutputPort: MagicItemPersistenceOutputPort,
    @Inject('CharacterPersistenceOutputPort')
    private readonly characterPersistenceOutputPort: CharacterPersistenceOutputPort,
  ) {}

  async execute(characterId: string): Promise<MagicItemModelOut> {
    const character =
      await this.characterPersistenceOutputPort.getCharacterById(characterId);

    if (!character) {
      throw new Error(`Character with id ${characterId} not found`);
    }

    const magicItems = character.magicItems as MagicItemModelOut[];

    if (magicItems.length === 0) {
      throw new Error(`Character with id ${characterId} has no amulet`);
    }

    const amulet = magicItems.find((item) => item.itemType === 'AMULET');

    if (!amulet) {
      throw new NotFoundException(
        `Amulet not found for character with id ${characterId}`,
      );
    }

    return amulet;
  }
}
