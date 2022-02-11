import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from '../user/user.repository';
import { RegisterUserInput } from './dto/register-user.input';
import * as bcrypt from 'bcrypt';
import { Equal } from 'typeorm';
import { AuthCredentialsInput } from './dto/auth-credentials.input';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async register(input: RegisterUserInput) {
    const { username, email } = input;
    const userNameExist = await this.userRepository.findOne({
      username: Equal(username),
    });
    const emailExist = await this.userRepository.findOne({
      email: Equal(email),
    });
    if (userNameExist) {
      throw new BadRequestException('Username already exists.');
    }
    if (emailExist) {
      throw new BadRequestException('Email already exists.');
    }

    const { password } = input;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    return await this.userRepository.save({
      ...input,
      password: hashedPassword,
    });
  }

  async login(input: AuthCredentialsInput) {
    const { username, password } = input;
    const user = await this.userRepository.findOne({
      username: Equal(username),
    });
    if (!user) {
      throw new BadRequestException('Invalid username or password.');
    }

    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      throw new BadRequestException('Invalid username or password.');
    }
    const { id, firstName, lastName, email, gender, role } = user;
    const payload = { id, username, firstName, lastName, email, gender, role };
    const accessToken: string = await this.jwtService.sign(payload);
    return { accessToken };
  }
}
