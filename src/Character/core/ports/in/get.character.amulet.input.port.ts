import { MagicItemModelOut } from 'src/MagicItem/core/domain/models/magic.item.model.out';

export interface GetCharacterAmuletInputPort {
  execute(characterId: string): Promise<MagicItemModelOut>;
}
