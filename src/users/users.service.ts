import { Injectable, Inject } from '@nestjs/common';
import { User } from './user.entity';
import { UserInput } from './inputs/user.input'
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY') private readonly usersRepository: typeof User) {}


  async findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne<User>({ where: { email: email } });
  } 


  async createUser(userToCreate: UserInput) {
    return User.create<User>(userToCreate);
  }

  createToken({email, password}: User) {
    return jwt.sign({email, password}, 'secret');
  }
}