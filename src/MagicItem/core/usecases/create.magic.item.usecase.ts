import { BadRequestException, Inject, Injectable } from '@nestjs/common';
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
    const alreadyExist =
      await this.magicItemPersistenceAdapter.checkIfItemExists(
        magicItemModelIn.name,
      );

    if (alreadyExist) {
      throw new BadRequestException('Magic item already exists');
    }

    return this.magicItemPersistenceAdapter.save(magicItemModelIn);
  }
}
