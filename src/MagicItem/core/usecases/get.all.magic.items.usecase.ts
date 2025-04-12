import { Inject, Injectable } from '@nestjs/common';
import { MagicItemPersistenceOutputPort } from '../ports/out/magic.item.persistence.output.port';
import { MagicItemModelOut } from '../domain/models/magic.item.model.out';
import { GetAllMagicItemsInputPort } from '../ports/in/get.all.magic.items.input.port';

@Injectable()
export class GetAllMagicItemUseCase implements GetAllMagicItemsInputPort {
  public constructor(
    @Inject('MagicItemPersistenceOutputPort')
    private readonly magicItemPersistenceAdapter: MagicItemPersistenceOutputPort,
  ) {}

  public async execute(): Promise<MagicItemModelOut[]> {
    return this.magicItemPersistenceAdapter.getAll();
  }
}
