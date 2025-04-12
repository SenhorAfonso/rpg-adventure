import { Inject, Injectable } from '@nestjs/common';
import { GetMagicItemsByCharacterInputPort } from '../ports/in/get.magic.items.by.character.input.port';
import { MagicItemPersistenceOutputPort } from '../ports/out/magic.item.persistence.output.port';

@Injectable()
export class GetMagicItemsByCharacterUsecase
  implements GetMagicItemsByCharacterInputPort
{
  public constructor(
    @Inject('MagicItemPersistenceOutputPort')
    private readonly magicItemPersistenceAdapter: MagicItemPersistenceOutputPort,
  ) { }

  execute(characterId: string): Promise<void> {
    return this.magicItemPersistenceAdapter.getMagicItemsByCharacter(
      characterId,
    );
  }
}
