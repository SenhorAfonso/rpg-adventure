import { Inject, Injectable } from '@nestjs/common';
import { MagicItemPersistenceOutputPort } from '../ports/out/magic.item.persistence.output.port';
import { DeleteMagicItemInputPort } from '../ports/in/delete.magic.item.input.port';

// envolve achar os personagens que estão usando o item e deletar o item deles também
// e depois deletar o item do banco de dados
@Injectable()
export class DeleteMagicItemUseCase implements DeleteMagicItemInputPort {
  public constructor(
    @Inject('MagicItemPersistenceOutputPort')
    private readonly magicItemPersistenceAdapter: MagicItemPersistenceOutputPort,
  ) {}

  public async execute(itemId: string): Promise<void> {
    return this.magicItemPersistenceAdapter.delete(itemId);
  }
}
