import { Injectable, Inject } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { User } from './user.entity';
import { UserInput } from './inputs/user.input'

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY') private readonly usersRepository: typeof User) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.findAll<User>();
  }
  
  async getUser(id: number): Promise<User> {
    return this.usersRepository.findByPk<User>(id);
  }

  async createUser(userToCreate: UserInput) {
    return User.create<User>(userToCreate);
  }
}