export interface GetMagicItemsByCharacterInputPort {
  execute(characterId: string): Promise<void>;
}
