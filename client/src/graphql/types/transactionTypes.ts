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

export interface CategoryStatistic {
  category: "saving" | "expense" | "investment"; // Assuming fixed categories
  totalAmount: number;
}



export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
    borderRadius: number;
    spacing: number;
    cutout: number;
  }[];
}