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
    const weaponItems: [string, number][] = [];
    const armorItems: [string, number][] = [];

    const amulet = items.find((item) => item.itemType === 'AMULET');
    const allWeapons = items.filter((item) => item.itemType === 'WEAPON');
    const totalStrength =
      document.strength +
      allWeapons.reduce((acc, item) => {
        return acc + item.strength;
      }, 0) +
      (amulet ? amulet.strength : 0);

    const allArmors = items.filter((item) => item.itemType === 'ARMOR');
    const totalDefense =
      document.defense +
      allArmors.reduce((acc, item) => {
        return acc + item.defense;
      }, 0) +
      (amulet ? amulet.defense : 0);

    weaponItems.push(['totalStrength', totalStrength]);
    armorItems.push(['totalDefense', totalDefense]);
    weaponItems.push(['natural', document.strength]);
    armorItems.push(['natural', document.defense]);

    allWeapons.forEach((weapon) => {
      weaponItems.push([weapon.name, weapon.strength]);
    });

    allArmors.forEach((armor) => {
      armorItems.push([armor.name, armor.defense]);
    });

    weaponItems.push([amulet.name, amulet.strength]);
    armorItems.push([amulet.name, amulet.strength]);
    const weaponsObject = Object.fromEntries(weaponItems);
    const armorsObject = Object.fromEntries(armorItems);

    return new CharacterModelOut(
      document.id,
      document.name,
      document.adventurerName,
      document.classe,
      document.level,
      weaponsObject,
      armorsObject,
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
