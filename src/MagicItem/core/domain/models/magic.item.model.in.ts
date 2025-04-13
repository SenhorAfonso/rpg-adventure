import { ITEM_TYPE } from 'src/MagicItem/adapters/in/enums/item.type';

export class MagicItemModelIn {
  constructor(
    public readonly name: string,
    private readonly itemType: ITEM_TYPE,
    private readonly strength: number,
    private readonly defense: number,
    private readonly owner: string = null,
  ) {}
}
