import { Injectable } from '@nestjs/common';
import { InjectModel } from "nestjs-typegoose";
import { ReviewModel } from "./review.model";
import { ModelType, DocumentType } from "@typegoose/typegoose/lib/types";
import { CreateReviewDto } from "./dto/create-review.dto";
import { Types } from "mongoose"


class Leak {

}

const leaks = []



@Injectable()
export class ReviewService {
    constructor(@InjectModel(ReviewModel) private readonly reviewModel: ModelType<ReviewModel> ) {}




    async create(dto: CreateReviewDto): Promise<DocumentType<ReviewModel>> {
        return this.reviewModel.create(dto)
    }

    async delete(id: string): Promise<DocumentType<ReviewModel> | null> {
        return  this.reviewModel.findByIdAndDelete(id).exec();
    }


    async findByProductId(productId: string): Promise<DocumentType<ReviewModel> []> {
        leaks.push(new Leak());
        const objId = new Types.ObjectId(productId);

        return this.reviewModel.find({ productId: objId }).exec();
    }

    async deleteByProductId(productId: string) {

        const deleteObjProductId = new Types.ObjectId(productId);

        return this.reviewModel.deleteMany({
            productId: deleteObjProductId
        }).exec()
    }

}
