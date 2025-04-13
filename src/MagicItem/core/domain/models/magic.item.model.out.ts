import { ITEM_TYPE } from 'src/MagicItem/adapters/in/enums/item.type';

export class MagicItemModelOut {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly itemType: ITEM_TYPE,
    public readonly strength: number,
    public readonly defense: number,
    public readonly owner: string,
  ) {}
}
