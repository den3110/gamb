import { Inject, Injectable } from '@nestjs/common';
import axios from 'axios';
import * as moment from 'moment';
import { GameService } from 'src/game/game.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PlayService {
  constructor(
    private readonly userSVC: UsersService,

    private readonly gameSVC: GameService,
  ) { }
  async playGame(
    userId: number,
    gameType: number,
    productId: number,
  ): Promise<any> {
    const user = await this.userSVC.findUser(userId);
    if (user) {
      const requestTime = moment().format('YYYYDDMMhhmmss');
      const response = await axios({
        method: 'POST',
        data: {
          OperatorCode: 'E133',
          MemberName: user.username,
          Password: user.password,
          DisplayName: user.username,
          ProductID: productId,
          GameType: gameType,
          LanguageCode: 8,
          Platform: 0,
          Sign: this.gameSVC.createSig('LaunchGame', requestTime),
          RequestTime: requestTime,
        },
        url: 'https://prod_md.9977997.com/Seamless/LaunchGame',
      });
      console.log(response);
      return response.data;
    }
    return false;
  }

  async playGameSub(
    userId: number,
    gameType: number,
    productId: number,
    gameId: string,
  ): Promise<any> {
    const user = await this.userSVC.findUser(userId);
    if (user) {
      const requestTime = moment().format('YYYYDDMMhhmmss');
      const response = await axios({
        method: 'POST',
        data: {
          OperatorCode: 'E133',
          MemberName: user.username,
          Password: user.password,
          DisplayName: user.username,
          ProductID: productId,
          GameType: gameType,
          LanguageCode: 8,
          Platform: 0,
          Sign: this.gameSVC.createSig('LaunchGame', requestTime),
          GameID: parseInt(gameId),
          RequestTime: requestTime,
        },
        url: 'https://prod_md.9977997.com/Seamless/LaunchGame',
      });
      console.log(response);
      return response.data;
    }
    return false;
  }
}
