import { AuthService } from './auth.service';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserLoginDto } from 'src/users/dto/login-user.dto';

@Resolver()
export class AuthResolver {
    constructor(
        private authService: AuthService,
    ) {}

    @Mutation(() => String)
    async login(@Args('input', {type: () => UserLoginDto}) userLogin: UserLoginDto) {
      let user = await this.authService.validateUser(userLogin.email, userLogin.password);
     
      if(user) 
      return this.authService.login(user);
    }
}