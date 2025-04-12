export interface AddMagicItemToCharacterInputPort {
  execute(characterId: string, magicItemId: string): Promise<void>;
}
