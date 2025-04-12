import { Module } from '@nestjs/common';
import { CharacterModule } from './Character/character.module';
import { MagicItemModule } from './MagicItem/magic.item.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
    }),
    CharacterModule,
    MagicItemModule,
  ],
})
export class AppModule {}
