import { MagicItemModelIn } from "../../domain/models/magic.item.model.in";
import { MagicItemModelOut } from "../../domain/models/magic.item.model.out";

export interface MagicItemPersistenceOutputPort {
    save(newItem: MagicItemModelIn): Promise<MagicItemModelOut>;
    getAll();
    delete();
}