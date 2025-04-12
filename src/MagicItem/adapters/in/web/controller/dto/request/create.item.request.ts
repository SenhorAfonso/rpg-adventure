import { IsEnum, IsInt, IsString } from 'class-validator';
import { ITEM_TYPE } from 'src/MagicItem/adapters/in/enums/item.type';

export class CreateMagicItemRequest {
  @IsString()
  name: string;

  @IsEnum(ITEM_TYPE)
  itemType: ITEM_TYPE;

  @IsInt()
  strength: number;

  @IsInt()
  defense: number;
}
