export interface DeleteMagicItemInputPort {
  execute(itemId: string): Promise<void>;
}
