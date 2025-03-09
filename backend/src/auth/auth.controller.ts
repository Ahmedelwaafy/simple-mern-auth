import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { SignInDto } from './dto/signin.dto';
import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { Response } from 'express';

@Controller('v1/auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Logged in successfully',
  })
  @ApiOperation({
    summary: 'signin as a user',
    description: 'signin as a user',
  })
  @ApiBody({
    description: 'User credentials for login',
    type: SignInDto,
  })
  @ResponseMessage('Logged in successfully')
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.signIn(signInDto, response);
  }

  @Post('sign-up')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Account created successfully',
  })
  @ApiOperation({
    summary: 'Create a new account',
    description: 'Create a new account',
  })
  @ApiBody({
    description: 'User credentials for login',
    type: CreateUserDto,
  })
  @ResponseMessage('Account created successfully')
  async signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @Post('sign-out')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Signed out successfully',
  })
  @ApiOperation({
    summary: 'Sign out',
    description: 'Sign out',
  })
  @ResponseMessage('Signed out successfully')
  async signOut(@Res({ passthrough: true }) response: Response) {
    return this.authService.signOut(response);
  }

  @Post('refresh-token')
  @HttpCode(HttpStatus.OK)
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return await this.authService.refreshToken(refreshTokenDto);
  }
}
