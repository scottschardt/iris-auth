import { AuthService } from './auth.service';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserLoginDto } from 'src/users/dto/login-user.dto';
import { HttpException, HttpStatus } from '@nestjs/common';

@Resolver()
export class AuthResolver {
    constructor(
        private authService: AuthService,
    ) {}

    @Mutation(() => String)
    async login(@Args('input', {type: () => UserLoginDto}) userLogin: UserLoginDto) {
      let user = await this.authService.validateUser(userLogin.email, userLogin.password);
      return user ? this.authService.login(user) : new HttpException('User not found!', HttpStatus.NOT_FOUND);
    }

}