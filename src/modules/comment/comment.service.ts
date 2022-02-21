import { BadRequestException, ForbiddenException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { PaginationParams } from 'src/common/pagination.input';
import { NftService } from '../nft/nft.service';
import { UserOutput } from '../user/dto/user.output';
import { CommentRepository } from './comment.repository';
import { CommentInput } from './dto/comment.input';
import { CommentUpdate } from './dto/comment.update';

@Injectable()
export class CommentService {
  constructor(private readonly commentRepository: CommentRepository,
              private readonly nftService: NftService) {}

  async createComment(user: UserOutput, input: CommentInput) {
    const nft = await this.nftService.findNftById(input.nftId);
    if (!nft) throw new BadRequestException('Nft not found');
    return await this.commentRepository.save({ nft: nft, comment: input.comment, user: user });
  }

  async findComments(pagination: PaginationParams, nftId: string) {
    const nft = await this.nftService.findNftById(nftId);
    if (!nft) throw new BadRequestException('Nft not found');
    return await this.commentRepository.findCommentsInNft(pagination, nftId);
  }

  async updateComment(user: UserOutput, input: CommentUpdate) {
    const comment = await this.commentRepository.findOne(input.id);
    if (!comment) throw new BadRequestException('Comment not found');
    if (comment.user.id !== user.id) throw new ForbiddenException('Method not allowed');
    return await this.commentRepository.save( {...comment, comment: input.comment} );
  }

  async deleteComment(user: UserOutput, commentId: string) {
    const comment = await this.commentRepository.findOne(commentId);
    if (!comment) throw new BadRequestException('Comment not found');
    if (comment.user.id !== user.id) throw new ForbiddenException('Method not allowed');
    await this.commentRepository.delete(commentId);
    return { message: "Successfully deleted comment " + commentId };
  }
}
