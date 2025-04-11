import { Module } from "@nestjs/common";
import { CharacterController } from "./adapters/in/web/controller/character.controller";

@Module({
    controllers: [CharacterController]
})
export class CharacterModule{}
