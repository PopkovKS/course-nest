import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    NotFoundException,
    Param,
    Patch,
    Post, UsePipes, ValidationPipe,
} from '@nestjs/common';
import { FindTopPageDto } from "./dto/find-top-page.dto";
import { TopPageService } from './top-page.service';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { IdValidationPipe } from '../pipes/ad-validation.pipes';
import { NOT_FOUND_TOP_PAGE_ERROR } from './top-page.constants';

@Controller('top-page')
export class TopPageController {
    constructor(
      private readonly topPageService: TopPageService
    ) {
    }

    @Get(':id')
    async get(@Param('id', IdValidationPipe) id: string) {
       const page = await this.topPageService.getById(id)
        if (!page) {
            throw new NotFoundException(NOT_FOUND_TOP_PAGE_ERROR)
        }
        return page;
    }


    @Get('byAlias/:alias')
    async getByAlias(@Param('alias') alias: string) {
        const aliasPage = await this.topPageService.findByAlias(alias)
        if (!aliasPage) {
            throw new NotFoundException(NOT_FOUND_TOP_PAGE_ERROR)
        }
        return aliasPage;
    }


    @Post('create')
    async create(@Body() dto: CreateTopPageDto) {
        return this.topPageService.create(dto)

    }


    @Delete(':id')
    async delete(@Param('id') id: string) {
        const deletedPage = await this.topPageService.deletedById(id)
        if (!deletedPage) {
            throw new NotFoundException(NOT_FOUND_TOP_PAGE_ERROR)
        }
        return deletedPage;
    }

    @Patch(':id')
    async patch(@Param('id') id: string, @Body() dto: CreateTopPageDto) {

        const updatedPage = await this.topPageService.updateById(id, dto)
        if (!updatedPage) {
            throw new NotFoundException(NOT_FOUND_TOP_PAGE_ERROR)
        }
        return updatedPage;

    }

    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Post()
    async find(@Body() dto: FindTopPageDto) {

    }
}
