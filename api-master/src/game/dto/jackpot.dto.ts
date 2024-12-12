import TransactionRequest from "./transaction/TransactionRequest.dto";

export default class JackpotRequest{
    MemberName:string;
    OperatorCode:string;
    ProductID:number;
    MessageID:string;
    RequestTime:string;
    Sign:string;
    Transactions: Array<TransactionRequest>

}