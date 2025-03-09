import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { SignInDto } from '../dto/signin.dto';
import { SignInProvider } from './sign-in.provider';
import { RefreshTokenProvider } from './refresh-token.provider';
import { RefreshTokenDto } from '../dto/refresh-token.dto';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { Response } from 'express';
import { SignOutProvider } from './sign-out.provider';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,

    private readonly signInProvider: SignInProvider,
    private readonly signOutProvider: SignOutProvider,
    private readonly refreshTokenProvider: RefreshTokenProvider,
  ) {}

  public async signIn(signInDto: SignInDto, response: Response) {
    return await this.signInProvider.signIn(signInDto, response);
  }

  public async signUp(createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }
  public async signOut(response: Response) {
    return await this.signOutProvider.signOut(response);
  }

  public async refreshToken(refreshTokenDto: RefreshTokenDto) {
    return await this.refreshTokenProvider.refreshToken(refreshTokenDto);
  }
}
