import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';  // Import from user module
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<User> {
    const { username, email, password, role } = registerDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({ username, email, password: hashedPassword, role });
    return this.userRepository.save(user);
  }

  async login({ username, password }: { username: string; password: string }) {
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username: user.username, sub: user.id, role: user.role };
    const access_token = this.jwtService.sign(payload, { expiresIn: '15m' });
    const refresh_token = this.jwtService.sign(payload, { expiresIn: '7d' });
    return { access_token, refresh_token };
  }

  async refreshToken({ refreshToken }: { refreshToken: string }) {
    try {
      const decoded = this.jwtService.verify(refreshToken);
      return this.login(decoded);
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
