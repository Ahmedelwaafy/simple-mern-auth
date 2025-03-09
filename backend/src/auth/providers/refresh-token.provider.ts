import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RefreshTokenDto } from '../dto/refresh-token.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import { GenerateTokensProvider } from './generate-tokens.provider';
import { ActiveUserData } from '../interfaces/active-user.interface';
import { UserService } from 'src/user/user.service';
import jwtConfig from 'src/config/jwt.config';

@Injectable()
export class RefreshTokenProvider {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,

    private readonly generateTokensProvider: GenerateTokensProvider,
    private readonly jwtService: JwtService,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  public async refreshToken(refreshToken: RefreshTokenDto) {
    console.log({ refreshToken });
    try {
      //verify the refresh token using jwtService

      const { id } = await this.jwtService.verifyAsync<
        Pick<ActiveUserData, 'id'>
      >(refreshToken.refreshToken, {
        secret: this.jwtConfiguration.secret,
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
      });

      //fetch user from the database

      const user = await this.userService.findOne(id);

      //generate the access token
      return await this.generateTokensProvider.generateTokens(user);
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
