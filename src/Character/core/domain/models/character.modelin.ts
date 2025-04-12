import { Classes } from 'src/Character/adapters/in/enums/classes';

export class CharacterModelIn {
  constructor(
    public readonly name: string,
    public readonly adventurerName: string,
    private readonly classe: Classes,
    private readonly level: number,
    private readonly strength: number,
    private readonly defense: number,
    public readonly magicItems: string[],
  ) {}
}
