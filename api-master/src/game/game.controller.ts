import {
  Controller,
  Post,
  Body,
  Logger,
  Get,
  ForbiddenException,
  UseGuards,
} from '@nestjs/common';
import { GameService } from './game.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetBalanceRequest } from './dto/getBalance/getBalanceRequest';
import PlaceBetRequest from './dto/placeBet/PlaceBetRequest.dto';
import { TransactionGameDuplicate } from 'src/exception/bad-request-exceptions';
import BuyInRequest from './dto/buy-in.dto';
import BuyOutRequest from './dto/buy-out.dto';
import MobileLoginRequest from './dto/mobile-login.dto';
import * as moment from 'moment';
import axios from 'axios';
import GameResultRequest from './dto/gameResult/gameResultRequest.dto';
import GameList from './dto/gamelist';
import { AuthGuard } from '@nestjs/passport';

@Controller('Seamless')
@ApiBearerAuth()
@ApiTags('Seamless')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  private readonly logger = new Logger(GameController.name);
  @Post('GetBalance')
  async GetBalance(@Body() gameList: GameList): Promise<any> {
    const requestTime = moment().format('YYYYDDMMhhmmss');
    const response = await axios({
      method: 'POST',
      data: {
        operator_code: 'N401',
        member_account: 'K8THIETKEGAME',
        product_code: 'CQ',
        currency: 'CNY',

        sign: this.gameService.createSig('getbalance', requestTime),
        request_time: requestTime,
      },
      url: 'https://staging.gsimw.com/api/seamless/balance',
    });
    console.log(response);
    return response.data;
  }

  @Post('PlaceBet')
  async PlaceBet(@Body() request: PlaceBetRequest) {
    return await this.gameService.process(request, 'PlaceBet');
  }

  @Post('test')
  async test() {
    try {
      throw new TransactionGameDuplicate();
    } catch (error) {
      if (error instanceof TransactionGameDuplicate) {
        return {
          ErrorCode: 1003,
          ErrorMessage: 'API Duplicate Transaction',
        };
      }
    }
  }

  @Post('GameResult')
  async GameResult(@Body() request: GameResultRequest) {
    return this.gameService.GameResult(request, 'GameResult');
  }

  @Post('Rollback')
  async Rollback(@Body() request: PlaceBetRequest) {
    return this.gameService.process(request, 'RollBack');
  }

  @Post('CancelBet')
  async CancelBet(@Body() request: PlaceBetRequest) {
    return this.gameService.process(request, 'CancelBet');
  }

  @Post('Bonus')
  async bonus(@Body() request: PlaceBetRequest) {
    return this.gameService.process(request, 'Bonus');
  }

  @Post('Jackpot')
  async jackpot(@Body() request: PlaceBetRequest) {
    // this.logger.debug(request);
    return this.gameService.process(request, 'Jackpot');
  }

  @Post('BuyIn')
  async BuyIn(@Body() request: BuyInRequest) {
    return this.gameService.processBuyIn(request, 'BuyIn');
  }

  @Post('BuyOut')
  async BuyOut(@Body() request: BuyOutRequest) {
    return this.gameService.processBuyOut(request, 'BuyOut');
  }

  @Post('PushBet')
  async PushBet(@Body() request: PlaceBetRequest) {
    return this.gameService.process(request, 'PushBet');
  }

  @Post('MobileLogin')
  async MobileLogin(@Body() request: MobileLoginRequest) {
    return {
      ErrorCode: 0,
      ErrorMessage: 'Success',
      Balance: 100,
      MemberName: 'MEMBER',
      BeforeBalance: 0,
    };
  }

  @UseGuards(AuthGuard(['member']))
  @Post('ListGame')
  async root(@Body() gameList: GameList): Promise<any> {
    const requestTime = moment().format('YYYYDDMMhhmmss');
    const response = await axios({
      method: 'POST',
      data: {
        OperatorCode: 'N401',
        MemberName: 'K8THIETKEGAME',
        DisplayName: 'N401-K8THIETKEGAME',
        ProductID: gameList.ProductID,
        GameType: gameList.GameType,
        LanguageCode: 8,
        Platform: 0,
        Sign: this.gameService.createSig('GetGameList', requestTime),
        RequestTime: requestTime,
      },
      url: 'https://prod_md.9977997.com/Seamless/GetGameList',
    });
    console.log(response);
    return response.data;
  }
}
