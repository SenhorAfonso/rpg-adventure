import { Inject, Injectable } from '@nestjs/common';
import { MagicItemPersistenceOutputPort } from '../ports/out/magic.item.persistence.output.port';
import { MagicItemModelOut } from '../domain/models/magic.item.model.out';
import { GetMagicItemByIdInputPort } from '../ports/in/get.magic.item.by.id.input.port';

@Injectable()
export class GetMagicItemByIdUseCase implements GetMagicItemByIdInputPort {
  public constructor(
    @Inject('MagicItemPersistenceOutputPort')
    private readonly magicItemPersistenceAdapter: MagicItemPersistenceOutputPort,
  ) {}

  public async execute(itemId: string): Promise<MagicItemModelOut> {
    return this.magicItemPersistenceAdapter.getById(itemId);
  }
}
