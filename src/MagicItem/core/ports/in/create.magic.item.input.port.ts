import { MagicItemModelIn } from '../../domain/models/magic.item.model.in';
import { MagicItemModelOut } from '../../domain/models/magic.item.model.out';

export interface CreateMagicItemInputPort {
  execute(newItem: MagicItemModelIn): Promise<MagicItemModelOut>;
}
