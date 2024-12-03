export interface Transaction {
  _id: string;
  userId: string;
  description: string;
  paymentType: string;
  category: string;
  amount: number;
  location: string;
  date: string;
  transactionId?:string;
}

export interface GetAllTransactionResponse{
  transactions:Transaction[]
}
export interface DeleteTransactionResponse{
  deleteTransaction:Transaction[]
}