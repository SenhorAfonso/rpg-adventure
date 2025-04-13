import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CharacterPersistenceOutputPort } from 'src/Character/core/ports/out/character.persistence.output.port';
import { Character } from './models/character.model';
import { Model } from 'mongoose';
import { CharacterMapper } from '../../in/web/controller/dto/character.mapper';
import { MagicItemPersistenceOutputPort } from 'src/MagicItem/core/ports/out/magic.item.persistence.output.port';
import { CharacterModelIn } from 'src/Character/core/domain/models/character.modelin';
import { CharacterModelOut } from 'src/Character/core/domain/models/character.model.out';
import { MagicItemModelOut } from 'src/MagicItem/core/domain/models/magic.item.model.out';

@Injectable()
export class CharacterPersistenceAdapter
  implements CharacterPersistenceOutputPort
{
  constructor(
    @InjectModel(Character.name)
    private readonly characterModel: Model<Character>,
    @Inject('MagicItemPersistenceOutputPort')
    private readonly magicItemPersistenceAdapter: MagicItemPersistenceOutputPort,
    private readonly characterMapper: CharacterMapper,
  ) {}
  async create(character: CharacterModelIn): Promise<CharacterModelOut> {
    const characterDocument = await this.characterModel.create(character);
    const items = await this.magicItemPersistenceAdapter.getByIdArray(
      character.magicItems,
    );

    return this.characterMapper.characterDocumentToCharacterModelOut(
      characterDocument,
      items,
    );
  }

  async addMagicItem(characterId: string, magicItemId: string): Promise<void> {
    await this.characterModel.findByIdAndUpdate(characterId, {
      $push: { magicItems: magicItemId },
    });

    await this.magicItemPersistenceAdapter.updateItemOwner(
      magicItemId,
      characterId,
    );
  }

  async deleteCharacter(characterId: any): Promise<void> {
    await this.characterModel.findByIdAndDelete(characterId);
  }

  async findAmulet(characterId: string): Promise<MagicItemModelOut> {
    const characterDocument = await this.characterModel.findById(characterId);
    const magicItemsId = characterDocument.magicItems;

    const magicItems =
      await this.magicItemPersistenceAdapter.getByIdArray(magicItemsId);

    return magicItems.find((item) => item.itemType === 'AMULET');
  }

  async getAllCharacters(): Promise<CharacterModelOut[]> {
    const allCharacters = await this.characterModel.find({});

    return this.characterMapper.characterDocumentArrayToCharacterModelOut(
      allCharacters,
    );
  }

  getMagicItems(characterId: string): Promise<any> {
    return this.characterModel.findById(characterId).populate('magicItems');
  }

  async updateCharacterAdventureName(
    characterId: string,
    newAdventureName: string,
  ): Promise<any> {
    await this.characterModel.findByIdAndUpdate(characterId, {
      adventurerName: newAdventureName,
    });
  }

  async removeCharacterMagicItem(
    characterId: string,
    magicItemId: string,
  ): Promise<void> {
    await this.characterModel.findByIdAndUpdate(characterId, {
      $pull: { magicItems: magicItemId },
    });
    await this.magicItemPersistenceAdapter.updateItemOwner(magicItemId, null);
  }

  async getCharacterById(characterId: string): Promise<CharacterModelOut> {
    const characterDocument = await this.characterModel.findById(characterId);

    if (!characterDocument) {
      throw new NotFoundException(`Character with id ${characterId} not found`);
    }

    const items = await this.magicItemPersistenceAdapter.getByIdArray(
      characterDocument.magicItems,
    );

    return this.characterMapper.characterDocumentToCharacterModelOut(
      characterDocument,
      items,
    );
  }

  async checkIfCharacterExistis(
    name: string,
    adventurerName: string,
  ): Promise<boolean> {
    const characterDocument =
      (await this.characterModel.findOne({
        name: name,
      })) ??
      (await this.characterModel.findOne({ adventurerName: adventurerName })) ??
      null;

    return characterDocument === null ? false : true;
  }
}
