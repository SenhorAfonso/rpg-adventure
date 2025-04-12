export interface DeleteCharacterByIdInputPort {
  execute(characterId: string): Promise<void>;
}
