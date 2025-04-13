import { MagicItemModelIn } from '../../domain/models/magic.item.model.in';
import { MagicItemModelOut } from '../../domain/models/magic.item.model.out';

export interface MagicItemPersistenceOutputPort {
  save(newItem: MagicItemModelIn): Promise<MagicItemModelOut>;
  getByIdArray(itemId: string[]): Promise<MagicItemModelOut[]>;
  getById(itemId: string): Promise<MagicItemModelOut>;
  getAll(): Promise<MagicItemModelOut[]>;
  delete(itemId: string): Promise<void>;
  getMagicItemsByCharacter(character: any): Promise<any>;
  checkIfItemExists(itemName: string): Promise<boolean>;
  updateItemOwner(itemId: string[] | string, newOwner: string): Promise<void>;
}
