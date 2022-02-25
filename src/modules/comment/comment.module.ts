import { forwardRef, Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentResolver } from './comment.resolver';
import { CommentRepository } from './comment.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NftModule } from '../nft/nft.module';
import { CommentsLoader } from './comment.loader';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentRepository]),
    forwardRef(() => NftModule),
  ],
  providers: [CommentService, CommentResolver, CommentsLoader],
  exports: [CommentService, CommentsLoader, TypeOrmModule.forFeature([CommentRepository])],
})
export class CommentModule {}
