import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserProvider } from './providers/create-user.provider';
import { FindUserByEmailProvider } from './providers/find-user-by-email.provider';
import { FindUserByIdProvider } from './providers/find-user-by-id.provider';
import { User } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    //* injecting user model
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly createUserProvider: CreateUserProvider,
    private readonly findUserByIdProvider: FindUserByIdProvider,
    private readonly findUserByEmailProvider: FindUserByEmailProvider,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.createUserProvider.createUser(createUserDto);
  }

  async findOne(id: string) {
    const user = await this.findUserByIdProvider.findById(id);
    return user;
  }

  public async findOneByEmail(email: string, includePassword = false) {
    return this.findUserByEmailProvider.findOneByEmail(email, includePassword);
  }
}
