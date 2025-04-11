import { Module } from "@nestjs/common";
import { MagicItemController } from "./adapters/in/web/controller/item.controller";
import { MagicItemPersistenceAdapter } from "./adapters/out/persistence/magic.item.persistence.adapter";

@Module({
    controllers: [MagicItemController],
    providers: [
        {
            provide: 'MagicItemPersistenceOutputPort',
            useClass: MagicItemPersistenceAdapter
        }
    ]
})
export class ItemModule { }
