export interface InputFieldProp {
  label: string;
  id: string;
  name: string;
  type?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

export interface RadioButtonProps {
  id: string;
  label: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  checked: boolean;
  name: string;
}

export interface SignUp {
  username: string;
  email: string;
  password: string;
  gender: string;
}
export interface Login{
  email:string;
  password:string;
}

export interface TransactionFormData {
  description: string;
  paymentType: string;
  category: string;
  amount: string;
  location: string;
  date: string;
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