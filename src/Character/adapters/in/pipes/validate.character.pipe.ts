/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
  Inject,
} from '@nestjs/common';
import { CreateCharacterRequest } from '../web/controller/dto/request/create.character.request';
import { MagicItemPersistenceOutputPort } from 'src/MagicItem/core/ports/out/magic.item.persistence.output.port';
import { MagicItemPersistenceAdapter } from 'src/MagicItem/adapters/out/persistence/magic.item.persistence.adapter';

export class ValidateCharacterPipe implements PipeTransform {
  constructor(
    @Inject('MagicItemPersistenceOutputPort')
    private readonly magicItemPersistenceAdapter: MagicItemPersistenceOutputPort,
  ) {}

  async transform(
    character: CreateCharacterRequest,
    metadata: ArgumentMetadata,
  ) {
    if (character.strength + character.defense > 10) {
      throw new BadRequestException(
        'Character strength and defense can not sum bigger than 10.',
      );
    }

    const characterItems = Array.from(new Set(character.magicItems));
    const items =
      await this.magicItemPersistenceAdapter.getByIdArray(characterItems);

    if (items.length === 0) {
      throw new BadRequestException(
        `Magic item with id ${character.magicItems[0]} does not exist`,
      );
    }

    const alreadyOwnedItems = [];
    items.forEach((item) => {
      if (item.owner) {
        alreadyOwnedItems.push(item.name);
      }
    });

    if (alreadyOwnedItems.length > 0) {
      throw new BadRequestException(
        `Items: ${alreadyOwnedItems.join(', ')} are already owned by another character.`,
      );
    }

    const amuletsArray = items.filter((item) => item.itemType === 'AMULET');

    if (amuletsArray.length > 1) {
      throw new BadRequestException(
        'Character can not have more than one amulet.',
      );
    }

    return character;
  }
}
