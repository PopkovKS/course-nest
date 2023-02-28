import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { ProductModel } from "./product.model";
import { FindProductDto } from "./dto/find-product.dto";
import { TopPageModel } from "../top-page/top-page.model";

@Controller('product')
export class ProductController {

    @Post('create')
    async create(@Body() dto: Omit<ProductModel, '_id'>) {
    }


    @Get(':id')
    async get(@Param('id') id: string) {

    }


    @Delete(':id')
    async delete() {

    }

    @Patch(':id')
    async patch(@Param('id') id: string, @Body() dto: TopPageModel) {

    }

    @HttpCode(200)
    @Post()
    async find(@Body() dto: FindProductDto) {

    }
}
