import { Module } from '@nestjs/common';
import { CharacterModule } from './Character/character.module';
import { ItemModule } from './MagicItem/magic.item.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    CharacterModule,
    ItemModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI')
      })
    })
  ],
})
export class AppModule { }
