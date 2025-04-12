import { CharacterModelOut } from '../../domain/models/character.model.out';
import { CharacterModelIn } from '../../domain/models/character.modelin';

export interface CreateCharacterInputPort {
  execute(character: CharacterModelIn): Promise<CharacterModelOut>;
}
