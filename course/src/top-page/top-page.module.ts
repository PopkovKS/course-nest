import { Module } from '@nestjs/common';
import { TopPageController } from './top-page.controller';
import { ConfigService } from "@nestjs/config";
import { TypegooseModule } from "nestjs-typegoose";

@Module({
  controllers: [TopPageController],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: TopPageModule,
        schemaOptions: {
          collection: 'TopPage'
        }
      }
    ])
  ],
  providers: [ConfigService]
})
export class TopPageModule {}
