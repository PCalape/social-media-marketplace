import { BadRequestException, ForbiddenException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { NftEntity } from '../nft/entity/nft.entity';
import { NftRepository } from '../nft/nft.repository';
import { NftService } from '../nft/nft.service';
import { UserOutput } from '../user/dto/user.output';
import { UserEntity } from '../user/entity/user.entity';
import { CommentRepository } from './comment.repository';
import { CommentService } from './comment.service';
import { CommentInput } from './dto/comment.input';
import { CommentPaginationOutput } from './dto/comment.pagination.output';
import { CommentUpdate } from './dto/comment.update';
import { CommentEntity } from './entity/comment.entity';

describe('CommentService', () => {
  let commentService: CommentService;
  let nftService: NftService;
  let commentRepository: CommentRepository;
  let nftRepository: NftRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommentService, CommentRepository, NftService, NftRepository],
    }).compile();

    commentService = await module.resolve(CommentService);
    nftService = await module.resolve(NftService);
    commentRepository = await module.resolve(CommentRepository);
    nftRepository = await module.resolve(NftRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('commentService', () => {
    it('should be defined', () => {
      expect(commentService).toBeDefined();
    });
  });

  describe('createComment', () => {
    it('should call save in comment repository and return comment entity', async () => {
      const user = new UserOutput();
      user.id = 'test user';
      const comment = new CommentInput();
      comment.comment = 'testing';
      comment.nftId = 'test nft';
      const nft = new NftEntity();
      nft.id = 'test nft';
      const commentEntity = new CommentEntity();
      commentEntity.id = 'test comment';
      commentEntity.comment = 'testing';

      jest.spyOn(nftService, 'findNftById').mockImplementation(async () => nft);
      jest.spyOn(commentRepository, 'save').mockImplementation(async () => commentEntity);

      const commentOutput = await commentService.createComment(user, comment);
      expect(commentOutput).toBe(commentEntity);
      expect(commentRepository.save).toHaveBeenCalledTimes(1);
    });
  });

  describe('createComment', () => {
    it('should throw BadRequestException when nft is not found', async () => {
      const user = new UserOutput();
      user.id = 'test user';
      const comment = new CommentInput();
      comment.comment = 'testing';
      comment.nftId = 'test nft';

      jest.spyOn(nftService, 'findNftById').mockImplementation(null);

      await expect(commentService.createComment(user, comment))
        .rejects.toThrowError(BadRequestException);
    });
  });

  describe('findComments', () => {
    it('should call findCommentsInNft in comment repository and return list of comments', async () => {
      const nft = new NftEntity();
      nft.id = 'test nft';
      const commentEntity = new CommentEntity();
      commentEntity.id = 'test comment';
      commentEntity.comment = 'testing';
      commentEntity.nft = nft;
      const commentPaginationOutput = new CommentPaginationOutput();
      commentPaginationOutput.output = [commentEntity];

      jest.spyOn(nftService, 'findNftById').mockImplementation(async () => nft);
      jest.spyOn(commentRepository, 'findCommentsInNft').mockImplementation(async () => commentPaginationOutput);

      const commentOutput = await commentService.findComments(null, nft.id);
      expect(commentOutput).toBe(commentPaginationOutput);
      expect(commentRepository.findCommentsInNft).toHaveBeenCalledTimes(1);
    });
  });

  describe('findComments', () => {
    it('should throw BadRequestException when nft is not found', async () => {
      const nft = new NftEntity();
      nft.id = 'test nft';

      jest.spyOn(nftService, 'findNftById').mockImplementation(null);

      await expect(commentService.findComments(null, nft.id))
        .rejects.toThrowError(BadRequestException);
    });
  });

  describe('updateComment', () => {
    it('should call save in comment repository and update and return comment', async () => {
      const user = new UserOutput();
      user.id = 'test user';
      const comment = new CommentUpdate();
      comment.comment = 'testing update';
      comment.id = 'test comment';
      const commentEntity = new CommentEntity();
      commentEntity.id = 'test comment';
      commentEntity.comment = 'testing';
      const userEntity = new UserEntity();
      userEntity.id = user.id;
      commentEntity.user = userEntity;

      jest.spyOn(commentRepository, 'findOne').mockImplementation(async () => commentEntity);
      jest.spyOn(commentRepository, 'save').mockImplementation(async () => {
        return {...commentEntity, comment: comment.comment}
      });

      const commentOutput = await commentService.updateComment(user, comment);
      expect(commentOutput.comment).toBe(comment.comment);
      expect(commentRepository.save).toHaveBeenCalledTimes(1);
    });
  });

  describe('updateComment', () => {
    it('should throw BadRequestException when comment is not found', async () => {
      const user = new UserOutput();
      user.id = 'test user';
      const comment = new CommentUpdate();
      comment.comment = 'testing update';
      comment.id = 'test comment';

      jest.spyOn(commentRepository, 'findOne').mockImplementation(null);

      await expect(commentService.updateComment(user, comment))
        .rejects.toThrowError(BadRequestException);
    });
  });

  describe('updateComment', () => {
    it('should throw ForbiddenException when updating not owned comment', async () => {
      const user = new UserOutput();
      user.id = 'test user';
      const comment = new CommentUpdate();
      comment.comment = 'testing update';
      comment.id = 'test comment';
      const commentEntity = new CommentEntity();
      commentEntity.id = 'test comment';
      commentEntity.comment = 'testing';
      const userEntity = new UserEntity();
      userEntity.id = 'not the same user';
      commentEntity.user = userEntity;

      jest.spyOn(commentRepository, 'findOne').mockImplementation(async () => commentEntity);

      await expect(commentService.updateComment(user, comment))
        .rejects.toThrowError(ForbiddenException);
    });
  });

  describe('deleteComment', () => {
    it('should call delete in comment repository and return succesful message', async () => {
      const user = new UserOutput();
      user.id = 'test user';
      const commentId = 'test comment';
      const commentEntity = new CommentEntity();
      commentEntity.id = 'test comment';
      commentEntity.comment = 'testing';
      const userEntity = new UserEntity();
      userEntity.id = user.id;
      commentEntity.user = userEntity;

      jest.spyOn(commentRepository, 'findOne').mockImplementation(async () => commentEntity);
      jest.spyOn(commentRepository, 'delete').mockImplementation(null);

      const commentOutput = await commentService.deleteComment(user, commentId);
      expect(commentOutput).toStrictEqual({ message: "Successfully deleted comment " + commentId });
      expect(commentRepository.delete).toHaveBeenCalledTimes(1);
    });
  });

  describe('deleteComment', () => {
    it('should throw BadRequestException when comment is not found', async () => {
      const user = new UserOutput();
      user.id = 'test user';
      const commentId = 'test comment';

      jest.spyOn(commentRepository, 'findOne').mockImplementation(null);

      await expect(commentService.deleteComment(user, commentId))
        .rejects.toThrowError(BadRequestException);
    });
  });

  describe('deleteComment', () => {
    it('should throw ForbiddenException when deleting not owned comment', async () => {
      const user = new UserOutput();
      user.id = 'test user';
      const commentId = 'test comment';
      const commentEntity = new CommentEntity();
      commentEntity.id = 'test comment';
      commentEntity.comment = 'testing';
      const userEntity = new UserEntity();
      userEntity.id = 'not the same user';
      commentEntity.user = userEntity;

      jest.spyOn(commentRepository, 'findOne').mockImplementation(async () => commentEntity);

      await expect(commentService.deleteComment(user, commentId))
        .rejects.toThrowError(ForbiddenException);
    });
  });
});
