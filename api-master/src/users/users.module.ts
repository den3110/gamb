import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserController } from './user.controller';
import { UserProfile } from './user.profile';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, UserProfile],
  exports: [UsersService],
  controllers: [UserController],
})
export class UsersModule {}
