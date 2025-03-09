import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { SignInDto } from './dto/signin.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { Response } from 'express';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  const mockResponse = () => {
    const res = {} as Response;
    res.cookie = jest.fn().mockReturnValue(res);
    return res;
  };

  const mockAuthService = {
    signIn: jest.fn(),
    signUp: jest.fn(),
    signOut: jest.fn(),
    refreshToken: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('signIn', () => {
    it('should call authService.signIn with correct parameters', async () => {
      const signInDto: SignInDto = {
        email: 'test@example.com',
        password: 'Password123!',
      };
      const response = mockResponse();
      const expectedResult = { id: 'user-id', email: 'test@example.com' };
      mockAuthService.signIn.mockResolvedValue(expectedResult);

      const result = await controller.signIn(signInDto, response);

      expect(authService.signIn).toHaveBeenCalledWith(signInDto, response);
      expect(result).toBe(expectedResult);
    });
  });

  describe('signUp', () => {
    it('should call authService.signUp with correct parameters', async () => {
      const createUserDto: CreateUserDto = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'Password123!',
      };
      const expectedResult = {
        id: 'user-id',
        name: 'Test User',
        email: 'test@example.com',
      };
      mockAuthService.signUp.mockResolvedValue(expectedResult);

      const result = await controller.signUp(createUserDto);

      expect(authService.signUp).toHaveBeenCalledWith(createUserDto);
      expect(result).toBe(expectedResult);
    });
  });

  describe('signOut', () => {
    it('should call authService.signOut with correct parameters', async () => {
      const response = mockResponse();
      await controller.signOut(response);

      expect(authService.signOut).toHaveBeenCalledWith(response);
    });
  });

  describe('refreshToken', () => {
    it('should call authService.refreshToken with correct parameters', async () => {
      const refreshTokenDto: RefreshTokenDto = {
        refreshToken: 'valid-refresh-token',
      };
      const expectedResult = {
        accessToken: 'new-access-token',
        refreshToken: 'new-refresh-token',
      };
      mockAuthService.refreshToken.mockResolvedValue(expectedResult);

      const result = await controller.refreshToken(refreshTokenDto);

      expect(authService.refreshToken).toHaveBeenCalledWith(refreshTokenDto);
      expect(result).toBe(expectedResult);
    });
  });
});
