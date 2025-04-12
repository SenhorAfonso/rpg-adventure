import { CharacterDocument } from 'src/Character/adapters/out/persistence/models/character.model';
import { CharacterModelIn } from '../../domain/models/character.modelin';
import { CharacterModelOut } from '../../domain/models/character.model.out';

export interface CharacterPersistenceOutputPort {
  create(character: CharacterModelIn): Promise<CharacterModelOut>;

  getAllCharacters(): Promise<CharacterModelOut[]>;
  getCharacterById(characterId: string): Promise<CharacterModelOut>;

  updateCharacterAdventureName(
    characterId: string,
    newAdventureName: string,
  ): Promise<CharacterDocument>;

  deleteCharacter(characterId: string): Promise<void>;

  addMagicItem(characterId: string, magicItemId: string): Promise<void>;

  findAmulet(character: any): Promise<any>;

  removeCharacterMagicItem(
    character: string,
    magicItemId: string,
  ): Promise<void>;

  checkIfCharacterExistis(
    characterName: string,
    adventurerName: string,
  ): Promise<boolean>;
}
