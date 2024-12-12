import TransactionRequest from './transaction/TransactionRequest.dto';

export default class BuyInRequest {
  MemberName: string;
  OperatorCode: string;
  ProductID: number;
  MessageID: string;
  RequestTime: string;
  Sign: string;
  Transaction: TransactionRequest;
  CheckLimit: boolean;
}
