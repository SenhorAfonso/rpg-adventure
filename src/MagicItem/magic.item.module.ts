import { Module } from '@nestjs/common';
import { MagicItemController } from './adapters/in/web/controller/magic.item.controller';
import { MagicItemPersistenceAdapter } from './adapters/out/persistence/magic.item.persistence.adapter';
import { CreateMagicItemUseCase } from './core/usecases/create.magic.item.usecase';
import { GetAllMagicItemUseCase } from './core/usecases/get.all.magic.items.usecase';
import { GetMagicItemByIdUseCase } from './core/usecases/get.magic.item.by.id.usecase';
import { DeleteMagicItemUseCase } from './core/usecases/delete.magic.item.usecase';
import { MongooseModule } from '@nestjs/mongoose';
import { MagicItemSchema } from './adapters/out/persistence/models/magic.item.model';
import { MagicItemMapper } from './adapters/in/web/controller/dto/magic.item.mapper';
import { GetMagicItemsByCharacterUsecase } from './core/usecases/get.magic.items.by.character.usecase';

@Module({
  controllers: [MagicItemController],
  imports: [
    MongooseModule.forFeature([{ name: 'MagicItem', schema: MagicItemSchema }]),
  ],
  providers: [
    MagicItemMapper,
    {
      provide: 'MagicItemPersistenceOutputPort',
      useClass: MagicItemPersistenceAdapter,
    },
    {
      provide: 'CreateMagicItemInputPort',
      useClass: CreateMagicItemUseCase,
    },
    {
      provide: 'GetAllMagicItemsInputPort',
      useClass: GetAllMagicItemUseCase,
    },
    {
      provide: 'GetMagicItemByIdInputPort',
      useClass: GetMagicItemByIdUseCase,
    },
    {
      provide: 'DeleteMagicItemInputPort',
      useClass: DeleteMagicItemUseCase,
    },
    {
      provide: 'GetMagicItemsByCharacterInputPort',
      useClass: GetMagicItemsByCharacterUsecase,
    },
  ],
  exports: [
    {
      provide: 'MagicItemPersistenceOutputPort',
      useClass: MagicItemPersistenceAdapter,
    },
  ],
})
export class MagicItemModule {}
