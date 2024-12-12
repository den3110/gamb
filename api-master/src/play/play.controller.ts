import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { PlayService } from './play.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import GameList from 'src/game/dto/gamelist';
import GameSub from 'src/game/dto/gamesub';

@Controller('play')
@ApiTags('play')
@ApiBearerAuth()
export class PlayController {
  constructor(private readonly playService: PlayService) {}
  @Post('play')
  @UseGuards(AuthGuard(['member']))
  async root(@Req() req,@Body() game: GameList): Promise<any> {
    const userId = req.user.userId;
    return this.playService.playGame(userId, game.GameType, game.ProductID);
  }

  @Post('sub')
  @UseGuards(AuthGuard(['member']))
  async gameSub(@Req() req,@Body() game: GameSub): Promise<any> {
    const userId = req.user.userId;
    return this.playService.playGameSub(userId, game.GameType, game.ProductID,game.GameId);
  }
}
