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
import { RemoveMagicItemFromCharacterUsecase } from 'src/Character/core/usecases/remove.magic.item.from.character.usecase';
import { CharacterPersistenceAdapter } from 'src/Character/adapters/out/persistence/character.persistence.adapter';
import { CharacterSchema } from 'src/Character/adapters/out/persistence/models/character.model';
import { CharacterMapper } from 'src/Character/adapters/in/web/controller/dto/character.mapper';

@Module({
  controllers: [MagicItemController],
  imports: [
    MongooseModule.forFeature([{ name: 'MagicItem', schema: MagicItemSchema }]),
    MongooseModule.forFeature([{ name: 'Character', schema: CharacterSchema }]),
  ],
  providers: [
    MagicItemMapper,
    CharacterMapper,
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
    {
      provide: 'RemoveMagicItemFromCharacterInputPort',
      useClass: RemoveMagicItemFromCharacterUsecase,
    },
    {
      provide: 'CharacterPersistenceOutputPort',
      useClass: CharacterPersistenceAdapter,
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
