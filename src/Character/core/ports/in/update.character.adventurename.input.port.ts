export interface UpdateAdventurerNameInputPort {
  execute(characterId: string, newName: string): Promise<void>;
}
