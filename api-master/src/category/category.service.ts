import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Category } from './entities/category.entity';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GameService } from 'src/game/game.service';
import axios from 'axios';
import * as moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { DATA_VV } from './data';
import { error } from 'console';
@Injectable()
export class CategoryService {
  getSub(catId: string): any {
    return this.categoryRepository.findBy({ catId: catId, isCategory: false })
  }
  private readonly logger = new Logger(CategoryService.name);
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectMapper()
    private readonly mapper: Mapper,
    private readonly gameSVC: GameService,
  ) { }

  async getCategory(): Promise<any> {
    // this.syncGameId();
    // this.syncVV()
    return this.categoryRepository.find({where:{isCategory:true},order:{number:"ASC"}})
  }

  async syncVV() {
    DATA_VV.map((v, k) => {
      const catIdTemp = uuidv4();
      this.categoryRepository.createQueryBuilder().insert().into(Category).values([{
        catId: catIdTemp,
        ProductId: null,
        ProductCode: null,
        ProductName: v.activeKey,
        cssKey: v.cssKey,
        bgImage: null,
        vi: v.activeKey,
        en: v.activeKey,
        isNew: false,
        isPlay: false,
        isCategory:true,
        isNewTab: false,
        GameType: null,
        isList:true,
        GameCode:uuidv4(),
      }]).execute().then((e) => {
        v?.sub?.map((vv, kk) => {
          this.categoryRepository.createQueryBuilder().insert().into(Category).values([{
            catId: catIdTemp,
            ProductId: null,
            ProductCode: null,
            ProductName: vv.visible,
            cssKey: v.cssKey,
            images: vv.images,
            logoImages: vv.logoImages,
            bgImage: vv.bgImage,
            vi: vv.visible,
            en: vv.visible,
            isNew: vv.isNew,
            isNewTab: false,
            isPlay: false,
            GameType: null,
            GameCode:uuidv4()
          }]).execute().catch((error)=>{
            console.log(error)
          })
        })
      }).catch((error)=>{
        console.log(error)
      })
    })
  }

  async syncGameId() {
    let productId = 1006;
    let gameType = 2;
    const requestTime = moment().format('YYYYDDMMhhmmss');
    const response = await axios({
      method: 'POST',
      data: {
        // MemberName: "MEMBER002",
        // Password: "MEMBER002",
        // DisplayName: "MEMBER002",
        OperatorCode: 'E133',
        ProductID: productId,
        GameType: gameType,
        LanguageCode: 8,
        Platform: 0,
        Sign: this.gameSVC.createSig('GetGameList', requestTime),
        RequestTime: requestTime,
      },
      url: 'https://prod_md.9977997.com/Seamless/GetGameList',
    });
    console.log("AAAAAAAAAAAAAAAAAA")
    if (response?.data?.ProviderGames) {
      response?.data?.ProviderGames?.map((v, k) => {
        console.log(v)
        this.categoryRepository.createQueryBuilder().insert().into(Category).values([{
          catId: productId + "",
          ProductId: productId,
          ProductCode: v.GameCode,
          ProductName: v.GameCode,
          vi: v.GameName,
          en: v.GameName,
          isNew: true,
          isPlay: true,
          GameType: gameType
        }]).orUpdate({ conflict_target: ['GameCode'], overwrite: ['ProductName'] }).execute()
      })
    }
  }
}
