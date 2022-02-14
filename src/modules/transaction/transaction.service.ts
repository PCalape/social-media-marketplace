import { Injectable } from '@nestjs/common';
import { UserRepository } from './transaction.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findUsers(userId: string) {
    return await this.userRepository.findUsers(userId);
  }

  async viewProfile(userId: string) {
    return await this.userRepository.viewProfile(userId);
  }

  async findUserById(userId: string) {
    return await this.userRepository.findOne(userId);
  }
}
