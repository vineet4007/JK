import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { username, email, password, role } = createUserDto;

    const existingUser = await this.userRepository.findOne({ where: [{ username }, { email }] });
    if (existingUser) {
      throw new ForbiddenException('User with this username or email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({ username, email, password: hashedPassword, role });
    return this.userRepository.save(user);
  }

  async updateUserRole(userId: number, role: string): Promise<User> {
    const user = await this.userRepository.findOne(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.role = role;
    return this.userRepository.save(user);
  }

  async deleteUser(userId: number): Promise<void> {
    const user = await this.userRepository.findOne(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.userRepository.delete(userId);
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }
}
