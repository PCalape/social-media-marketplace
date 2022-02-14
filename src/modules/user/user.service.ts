import { Injectable } from '@nestjs/common';
import { UserInput } from './dto/user.input';
import { UserOutput } from './dto/user.output';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findUsers(userId: string) {
    return await this.userRepository.findUsers(userId);
  }

  async viewProfile(userId: string) {
    return await this.userRepository.viewProfile(userId);
  }

  async updateProfile(userId: string, input: UserInput) {
    const user = await this.userRepository.preload({
    id: userId,
    ...input,
  });
    return this.userRepository.save(user);
  }

  async deleteUserById(userId: string) {
    await this.userRepository.softDelete(userId);
  }
}
