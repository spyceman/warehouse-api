import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../src/auth/auth.service';
import { PrismaService } from '../src/prisma.service';
import { AuthController } from '../src/auth/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from '../src/auth/user.service';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JwtModule.register({
        secret: 'secret',
        signOptions: {
          expiresIn: '1h',
        },
      })],
      controllers: [AuthController],
      providers: [AuthService, PrismaService, UserService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
