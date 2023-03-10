import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post, UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateReviewDto } from "./dto/create-review.dto";
import { ReviewService } from "./review.service";
import { REVIEW_NIT_FOUND } from "./review-constans";
import { JwtAuthGuards } from '../auth/guards/jwt.guards';
import { UserEmail } from '../decorators/user-email.decorator';
import { IdValidationPipe } from '../pipes/ad-validation.pipes';

@Controller('review')
export class ReviewController {
    constructor(private readonly reviewService: ReviewService) {
    }


    @UsePipes( new ValidationPipe())
    @Post('create')
    async create(@Body() dto: CreateReviewDto) {
       return  this.reviewService.create(dto)
    }

    @Delete(':id')
    async delete(@Param('id', IdValidationPipe) id: string) {
      const deletedDoc = await this.reviewService.delete(id)
        if(!deletedDoc) {
            throw new HttpException(REVIEW_NIT_FOUND, HttpStatus.NOT_FOUND)
        }

    }

    @UseGuards(JwtAuthGuards)
    @Get('byProduct/:productId')
    async getByProduct(@Param('productId', IdValidationPipe) productId: string, @UserEmail() email: string) {
       return  this.reviewService.findByProductId(productId)

    }


}
