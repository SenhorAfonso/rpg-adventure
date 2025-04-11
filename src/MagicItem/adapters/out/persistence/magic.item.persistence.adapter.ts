import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { MagicItemModelIn } from "src/MagicItem/core/domain/models/magic.item.model.in";
import { MagicItemPersistenceOutputPort } from "src/MagicItem/core/ports/out/magic.item.persistence.output.port";
import { MagicItem, MagicItemSchema } from "./models/magic.item.modelin";
import { Model } from "mongoose";
import { MagicItemMapper } from "../../in/web/controller/dto/magic.item.mapper";

@Injectable()
export class MagicItemPersistenceAdapter implements MagicItemPersistenceOutputPort {
    constructor(
        @InjectModel(MagicItem.name) private readonly magicItemModel: Model<MagicItem>,
        private readonly magicItemMapper: MagicItemMapper
    ) { }
    
    async save(itemModelIn: MagicItemModelIn) {
        const magicItemDocument = await this.magicItemModel.create(itemModelIn);
        return this.magicItemMapper.MagicItemDocumentToModelOut(magicItemDocument);
    }
    
    getAll() {
        console.log('recuperando todos');
    }
    
    delete() {
        console.log('deletando um');
    }
}