import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ActiveUser } from 'src/auth/decorators/active-user.decorator';
import { AuthenticationGuard } from 'src/auth/gaurds/authentication/authentication.guard';
import { ActiveUserData } from 'src/auth/interfaces/active-user.interface';
import { UserService } from './user.service';

@Controller('v1/user/profile')
@ApiTags('Profile')
export class UserProfileController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({
    summary: 'User fetches his data',
  })
  @ApiResponse({
    status: 200,
    description: 'Data fetched successfully',
  })
  @UseGuards(AuthenticationGuard)
  getMyProfile(@ActiveUser('id') id: ActiveUserData['id']) {
    return this.userService.findOne(id);
  }
}
