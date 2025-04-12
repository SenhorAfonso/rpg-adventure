export interface RemoveMagicItemFromCharacterInputPort {
  execute(characterId: string, magicItemId: string): Promise<void>;
}
