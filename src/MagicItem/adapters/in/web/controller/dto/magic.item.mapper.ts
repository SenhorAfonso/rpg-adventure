import { MagicItemModelIn } from "src/MagicItem/core/domain/models/magic.item.model.in";
import { CreateMagicItemRequest } from "./request/create.item.request";
import { MagicItemDocument } from "src/MagicItem/adapters/out/persistence/models/magic.item.modelin";
import { MagicItemModelOut } from "src/MagicItem/core/domain/models/magic.item.model.out";

export class MagicItemMapper {

    CreateMagicItemRequestToModelIn(request: CreateMagicItemRequest) {
       return new MagicItemModelIn(
            request.name,
            request.itemType,
            request.strength,
            request.defense
        )
    }

    MagicItemDocumentToModelOut(document: MagicItemDocument) {
        return new MagicItemModelOut(
            document.id,
            document.name,
            document.itemType,
            document.strength,
            document.defense,
        )
    }
}