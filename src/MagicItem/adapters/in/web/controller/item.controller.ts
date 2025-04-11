import { Body, Controller, Get, Inject, Injectable, Patch, Post, UsePipes } from "@nestjs/common";
import { CreateMagicItemRequest } from "./dto/request/create.item.request";
import { ValidateItemPipe } from "src/MagicItem/adapters/in/interceptors/validate.item.interceptor";
import { MagicItemPersistenceOutputPort } from "src/MagicItem/core/ports/out/magic.item.persistence.output.port";
import { MagicItemMapper } from "./dto/magic.item.mapper";

@Injectable()
@Controller('item')
export class MagicItemController {

    public constructor(
        @Inject('MagicItemPersistenceOutputPort')
        private readonly magicItemPersistenceAdapter: MagicItemPersistenceOutputPort,
        private readonly magicItemMapper: MagicItemMapper
    ) {

    }

    @Post()
    @UsePipes(new ValidateItemPipe())
    public createItem(@Body() request: CreateMagicItemRequest) {
        const itemModelIn = this.magicItemMapper.CreateMagicItemRequestToModelIn(request)
        return this.magicItemPersistenceAdapter.save(itemModelIn);
    }

    @Get()
    public getAllItems() {

    }

    @Get('/:id')
    public getItemById() {

    }
}