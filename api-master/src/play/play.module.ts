import { Module } from '@nestjs/common';
import { PlayService } from './play.service';
import { PlayController } from './play.controller';
import { UsersModule } from 'src/users/users.module';
import { GameModule } from 'src/game/game.module';

@Module({
  imports: [UsersModule, GameModule],
  controllers: [PlayController],
  providers: [PlayService],
})
export class PlayModule {}
