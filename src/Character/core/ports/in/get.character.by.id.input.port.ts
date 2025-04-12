import { CharacterModelOut } from '../../domain/models/character.model.out';

export interface GetCharacterByIdInputPort {
  execute(characterId: string): Promise<CharacterModelOut>;
}
