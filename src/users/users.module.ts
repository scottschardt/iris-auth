import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { usersProviders } from './users.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [
    UsersService,
    DatabaseModule,
    UsersResolver,
    ...usersProviders,
  ],
})
export class UsersModule {}