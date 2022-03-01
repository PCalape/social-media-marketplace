import { BadRequestException, Injectable } from '@nestjs/common';
import { UserInput } from './dto/user.input';
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
    const [user] = await this.userRepository.viewProfile(userId);
    if (!user) throw new BadRequestException('User not found');
    await this.userRepository.softDelete(userId);
    return { message: "Successfully deleted user " + userId };
  }

  async restoreUserById(userId: string) {
    await this.userRepository.restore(userId);
    const [user] = await this.userRepository.viewProfile(userId);
    if (!user) throw new BadRequestException('User not found');
    return { message: "Successfully restored user " + userId };
  }
}
