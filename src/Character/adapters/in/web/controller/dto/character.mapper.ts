import { Injectable } from '@nestjs/common';
import { CharacterDocument } from 'src/Character/adapters/out/persistence/models/character.model';
import { CharacterModelOut } from 'src/Character/core/domain/models/character.model.out';
import { CharacterModelIn } from 'src/Character/core/domain/models/character.modelin';
import { MagicItemModelOut } from 'src/MagicItem/core/domain/models/magic.item.model.out';
import { CreateCharacterRequest } from './request/create.character.request';

@Injectable()
export class CharacterMapper {
  characterRequestToModelIn(request: CreateCharacterRequest): CharacterModelIn {
    return new CharacterModelIn(
      request.name,
      request.adventurerName,
      request.classe,
      request.level,
      request.strength,
      request.defense,
      request.magicItems,
    );
  }

  characterDocumentToCharacterModelOut(
    document: CharacterDocument,
    items: MagicItemModelOut[],
  ): CharacterModelOut {
    return new CharacterModelOut(
      document.id,
      document.name,
      document.adventurerName,
      document.classe,
      document.level,
      document.strength,
      document.defense,
      items,
    );
  }

  characterDocumentArrayToCharacterModelOut(
    documents: CharacterDocument[],
  ): CharacterModelOut[] {
    const res: CharacterModelOut[] = [];

    documents.forEach((document) => {
      res.push(
        new CharacterModelOut(
          document.id,
          document.name,
          document.adventurerName,
          document.classe,
          document.level,
          document.strength,
          document.defense,
          document.magicItems,
        ),
      );
    });

    return res;
  }
}
