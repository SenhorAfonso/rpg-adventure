import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateCharacterInputPort } from '../ports/in/create.character.input.port';
import { CharacterModelOut } from '../domain/models/character.model.out';
import { CharacterModelIn } from '../domain/models/character.modelin';
import { CharacterPersistenceOutputPort } from '../ports/out/character.persistence.output.port';
import { MagicItemPersistenceOutputPort } from 'src/MagicItem/core/ports/out/magic.item.persistence.output.port';

@Injectable()
export class CreateCharacterUsecase implements CreateCharacterInputPort {
  constructor(
    @Inject('CharacterPersistenceOutputPort')
    private readonly characterPersistenceAdapter: CharacterPersistenceOutputPort,
    @Inject('MagicItemPersistenceOutputPort')
    private readonly magicItemPersistenceAdapter: MagicItemPersistenceOutputPort,
  ) {}
  async execute(character: CharacterModelIn): Promise<CharacterModelOut> {
    const alreadyExists =
      await this.characterPersistenceAdapter.checkIfCharacterExistis(
        character.name,
        character.adventurerName,
      );

    if (alreadyExists) {
      throw new BadRequestException('Character already exists');
    }

    const characterModelOut =
      await this.characterPersistenceAdapter.create(character);

    this.magicItemPersistenceAdapter.updateItemOwner(
      characterModelOut.magicItems.map((item) => item.id),
      characterModelOut.id,
    );

    return characterModelOut;
  }
}
