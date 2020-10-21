import { Injectable, Inject } from '@nestjs/common';
import { User } from './user.entity';
import { UserInput } from './inputs/user.input'
import { Observable } from 'rxjs';
const bcrypt = require('bcrypt');import * as jwt from 'jsonwebtoken';
const saltRounds = 10;

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY') private readonly usersRepository: typeof User,
    ) {}


  async findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne<User>({ where: { email: email } });
  } 


  async createUser(userToCreate: UserInput) {
    return User.create<User>(
      {
        firstName: userToCreate.firstName, 
        lastName: userToCreate.lastName, 
        email: userToCreate.email, 
        password: await this.hashPassword(userToCreate.password)
      });
  }


  async hashPassword(password: string): Promise<Observable<string>> {
    const salt = await bcrypt.genSaltSync(saltRounds);
    const hash = await bcrypt.hashSync(password, salt);    
    return hash;
  }
}