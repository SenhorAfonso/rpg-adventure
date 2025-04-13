import { Classes } from 'src/Character/adapters/in/enums/classes';
import { MagicItemModelOut } from 'src/MagicItem/core/domain/models/magic.item.model.out';

export class CharacterModelOut {
  constructor(
    public readonly id: string,
    private readonly name: string,
    private readonly adventurerName: string,
    private readonly classe: Classes,
    private readonly level: number,
    private readonly strength: { [k: string]: number } | number,
    private readonly defense: { [k: string]: number } | number,
    public readonly magicItems: MagicItemModelOut[] | string[],
  ) {}
}
