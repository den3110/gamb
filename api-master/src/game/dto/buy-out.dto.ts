import TransactionRequest from './transaction/TransactionRequest.dto';

export default class BuyOutRequest {
  MemberName: string;
  OperatorCode: string;
  ProductID: number;
  MessageID: string;
  RequestTime: string;
  Sign: string;
  Transaction: TransactionRequest;
  IsAddWager: boolean;
}
