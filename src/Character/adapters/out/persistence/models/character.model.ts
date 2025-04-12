import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Classes } from 'src/Character/adapters/in/enums/classes';

@Schema()
export class Character {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  adventurerName: string;

  @Prop({ required: true, enum: Classes })
  classe: Classes;

  @Prop({ required: true })
  level: number;

  @Prop({ required: true })
  strength: number;

  @Prop({ required: true })
  defense: number;

  @Prop({ required: true })
  magicItems: string[];
}

export const CharacterSchema = SchemaFactory.createForClass(Character);
export type CharacterDocument = HydratedDocument<Character>;
