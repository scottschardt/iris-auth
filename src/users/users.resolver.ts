import {Resolver, Query, Mutation, ResolveField, Args, Int, Context } from '@nestjs/graphql'
import { UsersService } from "./users.service";
import { User } from "./user.entity";
import { CreateUserDto } from './dto/create-user.dto';
import { UserLoginDto } from './dto/login-user.dto';
import { UserInput } from './inputs/user.input'
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard'

@Resolver(of => User)
export class UsersResolver {
  constructor(
    private usersService: UsersService,
  ) {}

  @Query(() => CreateUserDto)
  @UseGuards(AuthGuard)
  async whoAmI(@Context('user') user: User){
    return user;
  }

  @Mutation(() => CreateUserDto)
  async createUser(@Args('input', {type: () => UserInput}) user: UserInput) {
    return this.usersService.createUser(user);
  }
}