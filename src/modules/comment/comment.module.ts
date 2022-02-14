import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentResolver } from './comment.resolver';
import { CommentRepository } from './comment.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentRepository]),
  ],
  providers: [CommentService, CommentResolver],
  exports: [CommentService, TypeOrmModule.forFeature([CommentRepository])],
})
export class CommentModule {}
