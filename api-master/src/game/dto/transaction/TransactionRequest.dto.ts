export default class TransactionRequest {
  MemberID: number;
  OperatorID: number;
  ProductID: number;
  ProviderID: number;
  ProviderLineID: number;
  WagerID: number;
  CurrencyID: number;
  GameType: number;
  GameID: string;
  GameRoundID: string;
  ValidBetAmount: number;
  BetAmount: number;
  TransactionAmount: number;
  TransactionID: string;
  PayoutAmount: number;
  PayoutDetail: string;
  BetDetail: string;
  CommisionAmount: number;
  JackpotAmount: number;
  SettlementDate: Date;
  JPBet: number;
  Status: number;
  CreatedOn: Date;
  ModifiedOn: Date;
}
