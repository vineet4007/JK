import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../src/auth/auth.service';
import { AuthController } from '../src/auth/auth.controller';
import { UsersService } from '../src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../src/users/user.entity';

describe('AuthService', () => {
  let service: AuthService;
  let controller: AuthController;
  let usersService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        JwtService,
        UsersService,
      ],
      controllers: [AuthController],
    }).compile();

    service = module.get<AuthService>(AuthService);
    controller = module.get<AuthController>(AuthController);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should validate user credentials', async () => {
    const user: User = { id: 1, username: 'test', password: 'hashedPassword', role: 'admin' };
    jest.spyOn(usersService, 'findOne').mockResolvedValue(user);

    const result = await service.validateUser('test', 'hashedPassword');
    expect(result).toEqual(user);
  });

  it('should return a JWT token on login', async () => {
    const user: User = { id: 1, username: 'test', password: 'hashedPassword', role: 'admin' };
    jest.spyOn(usersService, 'findOne').mockResolvedValue(user);
    jest.spyOn(jwtService, 'sign').mockReturnValue('mockToken');

    const result = await controller.login({ username: 'test', password: 'hashedPassword' });
    expect(result.access_token).toEqual('mockToken');
  });
});
