import { Module } from '@nestjs/common';
import { CharacterController } from './adapters/in/web/controller/character.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CharacterSchema } from './adapters/out/persistence/models/character.model';
import { CharacterPersistenceAdapter } from './adapters/out/persistence/character.persistence.adapter';
import { CreateCharacterUsecase } from './core/usecases/create.character.usecase';
import { MagicItemModule } from 'src/MagicItem/magic.item.module';
import { CharacterMapper } from './adapters/in/web/controller/dto/character.mapper';
import { GetAllCharactersUsecase } from './core/usecases/get.all.characters.usecase';
import { GetCharacterByIdUsecase } from './core/usecases/get.character.by.id.usecase';
import { UpdateAdventurerNameUsecase } from './core/usecases/update.adventurer.name.usecase';
import { DeleteCharacterByIdUseCase } from './core/usecases/delete.character.by.id.usecase';
import { AddMagicItemToCharacterUsecase } from './core/usecases/add.magic.item.to.character.usecase';
import { RemoveMagicItemFromCharacterUsecase } from './core/usecases/remove.magic.item.from.character.usecase';
import { GetCharacterAmuleteUsecase } from './core/usecases/get.character.amulet.usecase';

@Module({
  controllers: [CharacterController],
  imports: [
    MagicItemModule,
    MongooseModule.forFeature([{ name: 'Character', schema: CharacterSchema }]),
  ],
  providers: [
    CharacterMapper,
    {
      provide: 'CharacterPersistenceOutputPort',
      useClass: CharacterPersistenceAdapter,
    },
    {
      provide: 'CreateCharacterInputPort',
      useClass: CreateCharacterUsecase,
    },
    {
      provide: 'GetAllCharactersInputPort',
      useClass: GetAllCharactersUsecase,
    },
    {
      provide: 'GetCharacterByIdInputPort',
      useClass: GetCharacterByIdUsecase,
    },
    {
      provide: 'DeleteCharacterByIdInputPort',
      useClass: DeleteCharacterByIdUseCase,
    },
    {
      provide: 'UpdateAdventurerNameInputPort',
      useClass: UpdateAdventurerNameUsecase,
    },
    {
      provide: 'AddMagicItemToCharacterInputPort',
      useClass: AddMagicItemToCharacterUsecase,
    },
    {
      provide: 'RemoveMagicItemFromCharacterInputPort',
      useClass: RemoveMagicItemFromCharacterUsecase,
    },
    {
      provide: 'GetCharacterAmuletInputPort',
      useClass: GetCharacterAmuleteUsecase,
    },
  ],
  exports: [
    {
      provide: 'CharacterPersistenceOutputPort',
      useClass: CharacterPersistenceAdapter,
    },
  ],
})
export class CharacterModule {}
