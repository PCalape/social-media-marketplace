import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepository } from '../user/user.repository';
import { JwtPayload } from './interface/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload) {
    const { id } = payload;
    const [user] = await this.userRepository.find({ id });

    if (!user) {
      throw new UnauthorizedException();
    }

    const { username, firstName, lastName, email, gender, role, birthDate, aboutMe } = user;
    const userInfo = {
      id: id,
      username: username,
      firstName: firstName,
      lastName: lastName,
      email: email,
      gender: gender,
      role: role,
      birthDate: birthDate,
      aboutMe: aboutMe,
    };
    return userInfo;
  }
}
