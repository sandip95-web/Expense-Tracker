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
  name: string;
  username: string;
  password: string;
  gender: string;
}
export interface Login{
  email:string;
  password:string;
}