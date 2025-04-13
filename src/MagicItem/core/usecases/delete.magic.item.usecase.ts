import { Inject, Injectable } from '@nestjs/common';
import { MagicItemPersistenceOutputPort } from '../ports/out/magic.item.persistence.output.port';
import { DeleteMagicItemInputPort } from '../ports/in/delete.magic.item.input.port';
import { RemoveMagicItemFromCharacterInputPort } from 'src/Character/core/ports/in/remove.magic.item.from.character.input.port';

@Injectable()
export class DeleteMagicItemUseCase implements DeleteMagicItemInputPort {
  public constructor(
    @Inject('MagicItemPersistenceOutputPort')
    private readonly magicItemPersistenceAdapter: MagicItemPersistenceOutputPort,
    @Inject('RemoveMagicItemFromCharacterInputPort')
    private readonly removeMagicItemFromCharacterUsecase: RemoveMagicItemFromCharacterInputPort,
  ) {}

  public async execute(itemId: string): Promise<void> {
    console.log('caiu aqui');
    await this.removeMagicItemFromCharacterUsecase.execute(null, itemId);
    await this.magicItemPersistenceAdapter.delete(itemId);
  }
}
