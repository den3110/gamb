import TransactionRequest from "./transaction/TransactionRequest.dto";

export default class CancelRequest{
    MemberName:string;
    OperatorCode:string;
    ProductID:number;
    MessageID:string;
    RequestTime:string;
    Sign:string;
    Transactions: Array<TransactionRequest>

}