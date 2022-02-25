import { Injectable, Scope } from "@nestjs/common";
import * as DataLoader from 'dataloader';
import { In } from "typeorm";
import { LoaderDto } from "../nft/dto/loader.dto";
import { CommentRepository } from "./comment.repository";
import { CommentPaginationOutput } from "./dto/comment.pagination.output";

@Injectable({ scope: Scope.REQUEST })
export class CommentsLoader {
    constructor(private commentRepository: CommentRepository) {}

    public getCommentsByNftId = new DataLoader<LoaderDto, CommentPaginationOutput>(async (keys) => {
        const nftIds = [];
        keys.forEach(loader => nftIds.push(loader.nftId));
        const pagination = keys[0].pagination;
        const take = pagination.limit || 5;
        const page = pagination.page || 1;
        const skip = (page-1) * take;

        const data = await this.commentRepository.find({
            relations: ['nft'], 
            where: { nft: {id: In(nftIds as string[])}}});

        return keys.map((loaderDto) => {
            const outputUnpaginated = data.filter(comment => comment.nft.id === loaderDto.nftId)
                                .sort((a, b) => a.updatedAt < b.updatedAt ? 1 : a.updatedAt > b.updatedAt ? -1 : 0);
            const outputPaginated = outputUnpaginated.filter((comment, index) => index >= skip && index < skip + take);
            const total = outputUnpaginated.length;
            const lastPage = Math.ceil(total/take);
            const count = outputPaginated.length;
            const offset = count * (page - 1);

            return {
                output: outputPaginated,
                total: total,
                count: count,
                offset: offset,
                limit: take,
                currentPage: page,
                totalPage: lastPage,
            } as CommentPaginationOutput
        });
    });
}