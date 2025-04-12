import { MagicItemModelOut } from '../../domain/models/magic.item.model.out';

export interface GetAllMagicItemsInputPort {
  execute(): Promise<MagicItemModelOut[]>;
}
