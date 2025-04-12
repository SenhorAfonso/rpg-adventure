import { Inject, Injectable } from '@nestjs/common';
import { MagicItemPersistenceOutputPort } from '../ports/out/magic.item.persistence.output.port';
import { MagicItemModelOut } from '../domain/models/magic.item.model.out';
import { MagicItemModelIn } from '../domain/models/magic.item.model.in';
import { CreateMagicItemInputPort } from '../ports/in/create.magic.item.input.port';

@Injectable()
export class CreateMagicItemUseCase implements CreateMagicItemInputPort {
  public constructor(
    @Inject('MagicItemPersistenceOutputPort')
    private readonly magicItemPersistenceAdapter: MagicItemPersistenceOutputPort,
  ) {}

  public async execute(
    magicItemModelIn: MagicItemModelIn,
  ): Promise<MagicItemModelOut> {
    return this.magicItemPersistenceAdapter.save(magicItemModelIn);
  }
}
