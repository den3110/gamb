import TransactionRequest from "../transaction/TransactionRequest.dto";


export default class PlaceBetRequest{
    MemberName: string;
    OperatorCode: string;
    ProductID: string;
    MessageID: string;
    RequestTime: string;
    Sign: string;
    Transactions: Array<TransactionRequest>;
    Data: object;
}