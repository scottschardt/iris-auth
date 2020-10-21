import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from "../users/user.entity";
import { Observable } from 'rxjs';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
    ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    const correctPassword = await this.comparePasswords(pass, user.password)
    return user && correctPassword ? user : null
  }


  async comparePasswords(newPassword: string, passwordHash: string): Promise<Observable<any | boolean>> {
      return await bcrypt.compare(newPassword, passwordHash);
  }

  async login(user: User) {
    const payload = { email: user.email, password: user.password };
    return this.jwtService.sign(payload);
  }

}