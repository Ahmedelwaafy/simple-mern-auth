import { forwardRef, Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AccessTokenGuard } from './gaurds/access-token/access-token.guard';
import { AuthService } from './providers/auth.service';
import { BcryptProvider } from './providers/bcrypt.provider';
import { GenerateTokensProvider } from './providers/generate-tokens.provider';
import { HashingProvider } from './providers/hashing.provider';
import { RefreshTokenProvider } from './providers/refresh-token.provider';
import { SignInProvider } from './providers/sign-in.provider';
import { SignOutProvider } from './providers/sign-out.provider';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: HashingProvider,
      useClass: BcryptProvider,
    },
    SignInProvider,
    SignOutProvider,
    GenerateTokensProvider,
    RefreshTokenProvider,
    AccessTokenGuard,
  ],
  imports: [forwardRef(() => UserModule)],
  exports: [AuthService, HashingProvider, AccessTokenGuard],
})
export class AuthModule {}
