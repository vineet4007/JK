import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../src/users/users.service';
import { UsersController } from '../src/users/users.controller';
import { User } from '../src/users/user.entity';
import { CreateUserDto } from '../src/users/dto/create-user.dto';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('UsersService', () => {
  let service: UsersService;
  let controller: UsersController;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
      controllers: [UsersController],
    }).compile();

    service = module.get<UsersService>(UsersService);
    controller = module.get<UsersController>(UsersController);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const createUserDto: CreateUserDto = { username: 'test', password: 'hashedPassword', role: 'admin' };
    const savedUser = { ...createUserDto, id: 1 };

    jest.spyOn(userRepository, 'save').mockResolvedValue(savedUser as any);

    const result = await service.create(createUserDto);
    expect(result).toEqual(savedUser);
  });

  it('should find a user by username', async () => {
    const user = { id: 1, username: 'test', password: 'hashedPassword', role: 'admin' };

    jest.spyOn(userRepository, 'findOne').mockResolvedValue(user as any);

    const result = await service.findOne('test');
    expect(result).toEqual(user);
  });

  it('should update user role', async () => {
    const user = { id: 1, username: 'test', password: 'hashedPassword', role: 'admin' };
    const updatedUser = { ...user, role: 'editor' };

    jest.spyOn(userRepository, 'findOne').mockResolvedValue(user as any);
    jest.spyOn(userRepository, 'save').mockResolvedValue(updatedUser as any);

    const result = await service.updateUserRole(1, 'editor');
    expect(result.role).toEqual('editor');
  });
});
