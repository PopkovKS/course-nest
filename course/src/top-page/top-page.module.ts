import { Module } from '@nestjs/common';
import { TopPageController } from './top-page.controller';
import { ConfigService } from "@nestjs/config";
import { TypegooseModule } from "nestjs-typegoose";
import { TopPageService } from './top-page.service';
import { TopPageModel } from './top-page.model';

@Module({
  controllers: [TopPageController],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: TopPageModel,
        schemaOptions: {
          collection: 'TopPage'
        }
      }
    ])
  ],
  providers: [ConfigService, TopPageService]
})
export class TopPageModule {}
