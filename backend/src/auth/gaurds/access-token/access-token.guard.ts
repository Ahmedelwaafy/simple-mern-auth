import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import {
  ACCESS_TOKEN_COOKIE_NAME,
  REQUEST_USER_KEY,
} from 'src/auth/constants/auth.constants';
import jwtConfig from 'src/config/jwt.config';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log(' canActivate runs ...');
    // extract the request from the context
    const request = context.switchToHttp().getRequest();

    // extract the access token from the request headers

    const token = this.extractHttpOnlyAccessTokenCookie(request);
    console.log({ token_value: token });
    //validate the access token using the jwt service
    if (!token) {
      throw new UnauthorizedException('Access token not found');
    }

    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        this.jwtConfiguration,
      );

      request[REQUEST_USER_KEY] = payload;
    } catch {
      throw new UnauthorizedException('Access token not valid');
    }

    return true;
  }

  private extractAccessToken(request: Request) {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
  private extractHttpOnlyAccessTokenCookie(request: Request) {
    const token = request.cookies[ACCESS_TOKEN_COOKIE_NAME];
    return token;
  }
}
