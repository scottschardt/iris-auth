import {Resolver, Query, Mutation, ResolveField, Args, Int } from '@nestjs/graphql'
import { UsersService } from "./users.service";
import { User } from "./user.entity";
import { UserDto } from './dto/user.dto';
import { UserInput } from './inputs/user.input'

@Resolver(of => User)
export class UsersResolver {
  constructor(
    private usersService: UsersService,
  ) {}

  @Query(() => User)
  async getUser(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.getUser(id);
  }

  @Query(returns => String)
   async sayHi(@Args({name: 'name', type: () => String}) name: String) {
      return `Hello ${name}`
  }

  // @Mutation(() => User)
  // async createUser(@Args('input', {type: () => UserInput}) user: UserInput) {
  //   return this.usersService.createUser(user);
  // }
}