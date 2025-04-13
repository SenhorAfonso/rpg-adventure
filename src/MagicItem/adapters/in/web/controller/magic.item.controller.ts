import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Injectable,
  Param,
  Post,
  UsePipes,
} from '@nestjs/common';
import { CreateMagicItemRequest } from './dto/request/create.item.request';
import { ValidateItemPipe } from 'src/MagicItem/adapters/in/pipes/validate.item.pipe';
import { MagicItemMapper } from './dto/magic.item.mapper';
import { CreateMagicItemInputPort } from 'src/MagicItem/core/ports/in/create.magic.item.input.port';
import { GetAllMagicItemsInputPort } from 'src/MagicItem/core/ports/in/get.all.magic.items.input.port';
import { GetMagicItemByIdInputPort } from 'src/MagicItem/core/ports/in/get.magic.item.by.id.input.port';
import { DeleteMagicItemInputPort } from 'src/MagicItem/core/ports/in/delete.magic.item.input.port';
import { GetMagicItemsByCharacterInputPort } from 'src/MagicItem/core/ports/in/get.magic.items.by.character.input.port';

@Injectable()
@Controller('item')
export class MagicItemController {
  public constructor(
    @Inject('CreateMagicItemInputPort')
    private readonly createMagicItemUseCase: CreateMagicItemInputPort,
    @Inject('GetAllMagicItemsInputPort')
    private readonly getAllMagicItemsUseCase: GetAllMagicItemsInputPort,
    @Inject('GetMagicItemByIdInputPort')
    private readonly getMagicItemById: GetMagicItemByIdInputPort,
    @Inject('DeleteMagicItemInputPort')
    private readonly deleteMagicItemUsecase: DeleteMagicItemInputPort,
    @Inject('GetMagicItemsByCharacterInputPort')
    private readonly getMagicItemsByCharacterUsecase: GetMagicItemsByCharacterInputPort,
    private readonly magicItemMapper: MagicItemMapper,
  ) {}

  @Post()
  @UsePipes(ValidateItemPipe)
  public createItem(@Body() request: CreateMagicItemRequest) {
    const itemModelIn =
      this.magicItemMapper.CreateMagicItemRequestToModelIn(request);
    return this.createMagicItemUseCase.execute(itemModelIn);
  }

  @Get()
  public getAllItems() {
    return this.getAllMagicItemsUseCase.execute();
  }

  @Get('/:id')
  public getItemById(@Param('id') id: string) {
    return this.getMagicItemById.execute(id);
  }

  @Get('/character/:id')
  public getMagicItemsByCharacter(@Param('id') id: string) {
    return this.getMagicItemsByCharacterUsecase.execute(id);
  }

  @Delete('/:id')
  public deleteItem(@Param('id') id: string) {
    return this.deleteMagicItemUsecase.execute(id);
  }
}
