import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { SignInDto } from '../dto/signin.dto';
import { GenerateTokensProvider } from './generate-tokens.provider';
import { HashingProvider } from './hashing.provider';
import { UserService } from 'src/user/user.service';
import { Response } from 'express';
import { ACCESS_TOKEN_COOKIE_NAME, REFRESH_TOKEN_COOKIE_NAME } from '../constants/auth.constants';

@Injectable()
export class SignInProvider {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,

    private readonly hashingProvider: HashingProvider,

    private readonly generateTokensProvider: GenerateTokensProvider,
  ) {}

  public async signIn(signInDto: SignInDto, response: Response) {
    // find user by email
    const user = await this.userService.findOneByEmail(signInDto.email, true);

    // compare password to the hash
    const isEqual = await this.hashingProvider.comparePassword(
      signInDto.password,
      user.password,
    );

    if (!isEqual) {
      throw new BadRequestException('Invalid credentials');
    }

    // Generate tokens
    const tokens = await this.generateTokensProvider.generateTokens(user);

    // Set tokens as HTTP-only cookies
    response.cookie(ACCESS_TOKEN_COOKIE_NAME, tokens.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production' ? true : false, // Ensures the cookie is only sent over HTTPS in production.
      sameSite: process.env.NODE_ENV === 'production' ? 'lax' : false, //'Lax': Helps prevent CSRF attacks while ensuring the cookie is sent with top-level navigations
      maxAge: 15 * 60 * 1000, // 15 minutes in milliseconds
    });

    response.cookie(REFRESH_TOKEN_COOKIE_NAME, tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'lax' : false,
      path: '/auth/refresh', // Restrict to refresh endpoint
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    });

    // Return user data without tokens
    const { password, ...userWithoutPassword } = user.toObject();
    return userWithoutPassword;
  }
}
