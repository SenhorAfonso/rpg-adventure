import { CharacterModelOut } from '../../domain/models/character.model.out';

export interface GetAllCharactersInputPort {
  execute(): Promise<CharacterModelOut[]>;
}
