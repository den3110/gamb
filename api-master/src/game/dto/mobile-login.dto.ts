import TransactionRequest from "./transaction/TransactionRequest.dto";

export default class MobileLoginRequest{
    MemberName:string;
    OperatorCode:string;
    ProductID:number;
    MessageID:string;
    RequestTime:string;
    Sign:string;
    Password: string;
}