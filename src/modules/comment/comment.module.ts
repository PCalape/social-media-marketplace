import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentResolver } from './comment.resolver';
import { CommentRepository } from './comment.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NftModule } from '../nft/nft.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentRepository]),
    NftModule,
  ],
  providers: [CommentService, CommentResolver],
  exports: [CommentService, TypeOrmModule.forFeature([CommentRepository])],
})
export class CommentModule {}
