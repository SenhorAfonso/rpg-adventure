import { PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { CreateMagicItemRequest } from '../web/controller/dto/request/create.item.request';

export class ValidateItemPipe implements PipeTransform {
    transform(item: CreateMagicItemRequest, metadata: ArgumentMetadata) {
        switch (item.itemType) {
            case 'WEAPON':
                item.defense = 0;
                break;
            case 'ARMOR':
                item.strength = 0;
                break;
        }

        if (item.defense > 10) {
            throw new BadRequestException('Item defense can not be bigger than 10.')
        }
        
        if (item.strength > 10) {
            throw new BadRequestException('Item strength can not be bigger than 10.')
        }
        
        if (item.defense === 0 && item.strength === 0) {
            throw new BadRequestException('Item can not have zero points of strength and defense at same time.')
        }

        return item;
    }
}