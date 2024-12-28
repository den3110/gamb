import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { createHash } from 'crypto';
import { Game } from './entities/game.entity';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransactionGameDuplicate } from 'src/exception/bad-request-exceptions';
import TransactionRequest from './dto/transaction/TransactionRequest.dto';
import PlaceBetRequest from './dto/placeBet/PlaceBetRequest.dto';
import BuyInRequest from './dto/buy-in.dto';
import BuyOutRequest from './dto/buy-out.dto';
import { UsersService } from 'src/users/users.service';
import { GetBalanceRequest } from './dto/getBalance/getBalanceRequest';
import GameResultRequest from './dto/gameResult/gameResultRequest.dto';

@Injectable()
export class GameService {
  private readonly logger = new Logger(GameService.name);
  constructor(
    @InjectRepository(Game)
    private gamesRepository: Repository<Game>,
    @InjectMapper()
    private readonly mapper: Mapper,
    private readonly userSVC: UsersService,
  ) {}

  async getGameByWagerID(WagerID: number): Promise<any> {
    try {
      return await this.gamesRepository.findOneByOrFail({ WagerID: WagerID });
    } catch (error) {
      console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
      return false;
    }
  }

  async getTransaction(transactionId: string): Promise<any> {
    try {
      return await this.gamesRepository.findOneByOrFail({
        TransactionID: transactionId,
      });
    } catch (error) {
      return false;
    }
  }

  async saveGame(transaction: TransactionRequest): Promise<Game> {
    try {
      const game = Game.toModel(transaction);
      await this.gamesRepository.save(game);
      return game;
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new TransactionGameDuplicate();
      } else {
        throw error;
      }
    }
  }

  async process(request: PlaceBetRequest, functionName: string): Promise<any> {
    try {
      try {
        const user = await this.userSVC.findUserByUserName(request.MemberName);
        console.log(user);
        if (!user) {
          return {
            ErrorCode: 1000,
            ErrorMessage: 'API Member Not Exists',
          };
        }
        const sig = await this.createSig(functionName, request.RequestTime);
        // this.logger.debug(sig);
        if (request.Sign != sig) {
          return {
            ErrorCode: 1004,
            ErrorMessage: 'API Invalid Sign',
          };
        }
        const balance = user.amount;
        let balanceFinal = balance;
        console.log(request.Transactions);
        if (request.Transactions) {
          for (let i = 0; i < request.Transactions.length; i++) {
            await this.saveGame(request.Transactions[i]);
            this.logger.debug(balanceFinal);
            balanceFinal += request.Transactions[i].TransactionAmount;
          }
        }

        if (balanceFinal < 0) {
          return {
            ErrorCode: 1001,
            ErrorMessage: 'API Member Insufficient Balance',
          };
        }
        this.userSVC.updateBalance(user.id, balanceFinal);
        return {
          ErrorCode: 0,
          ErrorMessage: 'Success',
          Balance: balanceFinal,
          MemberName: user.username,
          BeforeBalance: balance,
        };
      } catch (error) {
        this.logger.error(error);
        console.log('CONTROLLERRRRRRRRRRRRRRRRRRRRRRRRRR');
        console.log(error);
        if (error instanceof TransactionGameDuplicate) {
          return {
            ErrorCode: 1003,
            ErrorMessage: 'API Duplicate Transaction',
          };
        }
      }
    } catch (error) {
      throw error;
    }
  }

  async processBuyIn(
    request: BuyInRequest,
    functionName: string,
  ): Promise<any> {
    try {
      const user = await this.userSVC.findUserByUserName(request.MemberName);
      console.log(user);
      if (!user) {
        return {
          ErrorCode: 1000,
          ErrorMessage: 'API Member Not Exists',
        };
      }

      const sig = await this.createSig(functionName, request.RequestTime);
      // this.logger.debug(sig);
      if (request.Sign != sig) {
        return {
          ErrorCode: 1004,
          ErrorMessage: 'API Invalid Sign',
        };
      }
      const balance = user.amount;
      let balanceFinal = balance;
      console.log(request.Transaction);
      if (request.Transaction) {
        await this.saveGame(request.Transaction);
        this.logger.debug(balanceFinal);
        balanceFinal += request.Transaction.TransactionAmount;
      }

      if (balanceFinal < 0) {
        return {
          ErrorCode: 1001,
          ErrorMessage: 'API Member Insufficient Balance',
        };
      }
      this.userSVC.updateBalance(user.id, balanceFinal);
      return {
        ErrorCode: 0,
        ErrorMessage: 'Success',
        MemberName: user.username,
        Balance: balanceFinal,
        BeforeBalance: balance,
      };
    } catch (error) {
      this.logger.error(error);
      console.log('CONTROLLERRRRRRRRRRRRRRRRRRRRRRRRRR');
      console.log(error);
      if (error instanceof TransactionGameDuplicate) {
        return {
          ErrorCode: 1003,
          ErrorMessage: 'API Duplicate Transaction',
        };
      }
    }
  }

  async processBuyOut(
    request: BuyOutRequest,
    functionName: string,
  ): Promise<any> {
    try {
      const user = await this.userSVC.findUserByUserName(request.MemberName);
      if (!user) {
        return {
          ErrorCode: 1000,
          ErrorMessage: 'API Member Not Exists',
        };
      }
      const sig = await this.createSig(functionName, request.RequestTime);
      // this.logger.debug(sig);
      if (request.Sign != sig) {
        return {
          ErrorCode: 1004,
          ErrorMessage: 'API Invalid Sign',
        };
      }
      const balance = user.amount;
      let balanceFinal = balance;

      if (request.Transaction) {
        await this.saveGame(request.Transaction);
        this.logger.debug(balanceFinal);
        balanceFinal += request.Transaction.TransactionAmount;
      }

      if (balanceFinal < 0) {
        return {
          ErrorCode: 1001,
          ErrorMessage: 'API Member Insufficient Balance',
        };
      }
      this.userSVC.updateBalance(user.id, balanceFinal);
      return {
        ErrorCode: 0,
        ErrorMessage: 'Success',
        Balance: balanceFinal,
        MemberName: user.username,
        BeforeBalance: balance,
      };
    } catch (error) {
      this.logger.error(error);
      console.log('CONTROLLERRRRRRRRRRRRRRRRRRRRRRRRRR');
      console.log(error);
      if (error instanceof TransactionGameDuplicate) {
        return {
          ErrorCode: 1003,
          ErrorMessage: 'API Duplicate Transaction',
        };
      }
    }
  }

  async GameResult(
    request: GameResultRequest,
    functionName: string,
  ): Promise<any> {
    try {
      const user = await this.userSVC.findUserByUserName(request.MemberName);
      if (!user) {
        return {
          ErrorCode: 1000,
          ErrorMessage: 'API Member Not Exists',
        };
      }
      const sig = await this.createSig(functionName, request.RequestTime);
      // this.logger.debug(sig);
      if (request.Sign != sig) {
        return {
          ErrorCode: 1004,
          ErrorMessage: 'API Invalid Sign',
        };
      }
      const balance = user.amount;
      let balanceFinal = balance;
      if (request.Transactions) {
        for (let i = 0; i < request.Transactions.length; i++) {
          if (
            request.Transactions[i].WagerID == null ||
            request.Transactions[i].WagerID == undefined
          ) {
            return {
              ErrorCode: 1006,
              ErrorMessage: 'API Bet Not Exist',
            };
          }
          if (await this.getGameByWagerID(request.Transactions[i].WagerID)) {
            await this.saveGame(request.Transactions[i]);
            balanceFinal =
              balanceFinal + request.Transactions[i].TransactionAmount;
          } else {
            return {
              ErrorCode: 1006,
              ErrorMessage: 'API Bet Not Exist',
            };
          }
        }
      }

      if (balanceFinal < 0) {
        return {
          ErrorCode: 1001,
          ErrorMessage: 'API Member Insufficient Balance',
        };
      } else {
        this.userSVC.updateBalance(user.id, balanceFinal);
        return {
          ErrorCode: 0,
          ErrorMessage: 'Success',
          Balance: balanceFinal,
          MemberName: user.username,
          BeforeBalance: balance,
        };
      }
    } catch (error) {
      this.logger.error(error);
      console.log('CONTROLLERRRRRRRRRRRRRRRRRRRRRRRRRR');
      console.log(error);
      if (error instanceof TransactionGameDuplicate) {
        return {
          ErrorCode: 1003,
          ErrorMessage: 'API Duplicate Transaction',
        };
      }
    }
  }

  async GetBalance(
    request: GetBalanceRequest,
    functionName: string,
  ): Promise<any> {
    try {
      const user = await this.userSVC.findUserByUserName(request.MemberName);
      if (!user) {
        return {
          ErrorCode: 1000,
          ErrorMessage: 'API Member Not Exists',
        };
      }
      const sig = await this.createSig(functionName, request.RequestTime);
      // this.logger.debug(sig);
      if (request.Sign != sig) {
        return {
          ErrorCode: 1004,
          ErrorMessage: 'API Invalid Sign',
        };
      }
      return {
        ErrorCode: 0,
        ErrorMessage: 'Success',
        Balance: user.amount,
        MemberName: user.username,
        BeforeBalance: user.amount,
      };
    } catch (error) {
      this.logger.error(error);
      console.log('CONTROLLERRRRRRRRRRRRRRRRRRRRRRRRRR');
      console.log(error);
      if (error instanceof TransactionGameDuplicate) {
        return {
          ErrorCode: 1003,
          ErrorMessage: 'API Duplicate Transaction',
        };
      }
    }
  }

  createSig(functionName: string, requestTime: string): string {
    return createHash('md5')
      .update('E133' + requestTime + functionName.toLowerCase() + 'PEh59K')
      .digest('hex');
  }
}
