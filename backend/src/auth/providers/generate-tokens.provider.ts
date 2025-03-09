import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from 'src/config/jwt.config';
import { UserDocument } from 'src/user/schemas/user.schema';
import { ActiveUserData } from '../interfaces/active-user.interface';

@Injectable()
export class GenerateTokensProvider {
  constructor(
    private readonly jwtService: JwtService,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  public async signToken<T>(id: string, expiresIn: number, payload?: T) {
    return await this.jwtService.signAsync(
      {
        id,
        ...payload,
      },
      {
        audience: this.jwtConfiguration.audience,
        secret: this.jwtConfiguration.secret,
        issuer: this.jwtConfiguration.issuer,
        expiresIn,
      },
    );
  }

  public async generateTokens(user: UserDocument) {
    const { password, _id, ...rest } = user.toObject();

    const id = _id.toString();
    const [accessToken, refreshToken] = await Promise.all([
      this.signToken<Partial<ActiveUserData>>(
        id,
        this.jwtConfiguration.accessTokenTtl,
        rest,
      ),
      this.signToken(id, this.jwtConfiguration.refreshTokenTtl),
    ]);

    return { accessToken, refreshToken };
  }
}
