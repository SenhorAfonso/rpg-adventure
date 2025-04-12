import { MagicItemModelOut } from '../../domain/models/magic.item.model.out';

export interface GetMagicItemByIdInputPort {
  execute(itemId: string): Promise<MagicItemModelOut>;
}
