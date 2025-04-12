import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ITEM_TYPE } from 'src/MagicItem/adapters/in/enums/item.type';

@Schema()
export class MagicItem {
  @Prop({ required: true })
  name: string;

  @Prop({ enum: ITEM_TYPE })
  itemType: ITEM_TYPE;

  @Prop({ required: true })
  strength: number;

  @Prop({ required: true })
  defense: number;

  @Prop({ required: false })
  owner: string;
}

export const MagicItemSchema = SchemaFactory.createForClass(MagicItem);
export type MagicItemDocument = HydratedDocument<MagicItem>;
