import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { Mapper, MappingProfile, createMap } from '@automapper/core';
import TransactionRequest from './dto/transaction/TransactionRequest.dto';
import { Game } from './entities/game.entity';
@Injectable()
export class GameProfileMapper extends AutomapperProfile {
  get profile(): MappingProfile {
    return (mapper) => {
      createMap(mapper, Game, TransactionRequest);
    };
  }
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }
}
