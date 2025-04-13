import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MagicItemModelIn } from 'src/MagicItem/core/domain/models/magic.item.model.in';
import { MagicItemPersistenceOutputPort } from 'src/MagicItem/core/ports/out/magic.item.persistence.output.port';
import { MagicItem } from './models/magic.item.model';
import { Model } from 'mongoose';
import { MagicItemMapper } from '../../in/web/controller/dto/magic.item.mapper';
import { MagicItemModelOut } from 'src/MagicItem/core/domain/models/magic.item.model.out';

@Injectable()
export class MagicItemPersistenceAdapter
  implements MagicItemPersistenceOutputPort
{
  constructor(
    @InjectModel(MagicItem.name)
    private readonly magicItemModel: Model<MagicItem>,
    private readonly magicItemMapper: MagicItemMapper,
  ) {}

  async save(itemModelIn: MagicItemModelIn) {
    const magicItemDocument = await this.magicItemModel.create(itemModelIn);
    return this.magicItemMapper.MagicItemDocumentToModelOut(magicItemDocument);
  }

  async getAll(): Promise<MagicItemModelOut[]> {
    const allItems = await this.magicItemModel.find({});
    return this.magicItemMapper.MagicItemDocumentsArrayToModelOut(allItems);
  }

  async getById(itemId: string): Promise<MagicItemModelOut> {
    const item = await this.magicItemModel.findById(itemId);

    if (!item) {
      throw new NotFoundException(`Magic item with id ${itemId} not found`);
    }

    return this.magicItemMapper.MagicItemDocumentToModelOut(item);
  }

  async checkIfItemExists(itemName: string): Promise<boolean> {
    const item = await this.magicItemModel.findOne({ name: itemName });

    if (!item) {
      return false;
    }
    return true;
  }

  async getByIdArray(itemId: string[]): Promise<MagicItemModelOut[]> {
    const items = await this.magicItemModel.find({ _id: { $in: itemId } });
    return this.magicItemMapper.MagicItemDocumentsArrayToModelOut(items);
  }

  async delete(magicItemId: string): Promise<void> {
    await this.magicItemModel.findByIdAndDelete(magicItemId);
  }

  async getMagicItemsByCharacter(
    characterName: string,
  ): Promise<MagicItemModelOut[]> {
    const items = await this.magicItemModel.find({ owner: characterName });
    return this.magicItemMapper.MagicItemDocumentsArrayToModelOut(items);
  }

  async updateItemOwner(
    itemId: string[] | string,
    newOwner: string | null,
  ): Promise<void> {
    if (Array.isArray(itemId)) {
      await this.magicItemModel.updateMany(
        { _id: { $in: itemId } },
        { owner: newOwner },
      );
    } else {
      await this.magicItemModel.updateMany(
        { _id: itemId },
        { owner: newOwner },
      );
    }
  }
}
