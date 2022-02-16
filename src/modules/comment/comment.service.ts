import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { NftService } from '../nft/nft.service';
import { UserOutput } from '../user/dto/user.output';
import { CommentRepository } from './comment.repository';
import { CommentInput } from './dto/comment.input';
import { CommentUpdate } from './dto/comment.update';
import { CommentEntity } from './entity/comment.entity';

@Injectable()
export class CommentService {
  constructor(private readonly commentRepository: CommentRepository,
              private readonly nftService: NftService) {}

  async createComment(user: UserOutput, input: CommentInput) {
    const nft = await this.nftService.findNftById(input.nftId);
    if (!nft) throw new BadRequestException('Nft not found');
    return await this.commentRepository.save({ nft: nft, comment: input.comment, user: user });
  }

  async findComments(offset: number, limit: number, nftId: string) {
    const nft = await this.nftService.findNftById(nftId);
    if (!nft) throw new BadRequestException('Nft not found');
    return await this.commentRepository.findCommentsInNft(offset, limit, nftId);
  }

  async updateComment(user: UserOutput, input: CommentUpdate) {
    const comment = await this.commentRepository.findOne(input.id);
    if (comment.user.id !== user.id) throw new ForbiddenException('Method not allowed');
    if (!comment) throw new BadRequestException('Comment not found');
    return await this.commentRepository.save( {...comment, comment: input.comment} );
  }

  async deleteComment(user: UserOutput, commentId: string) {
    const comment = await this.commentRepository.findOne(commentId);
    if (comment.user.id !== user.id) throw new ForbiddenException('Method not allowed');
    if (!comment) throw new BadRequestException('Comment not found');
    await this.commentRepository.delete(commentId);
    return { message: "Successfully deleted comment " + commentId };
  }
}
