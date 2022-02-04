import { AccountModel } from "../models/account";

interface IAddAccountModel {
  name: string;
  email: string;
  password: string;
}

interface IAddAccount {
  add({
    email,
    name,
    password,
  }: IAddAccountModel): Promise<AccountModel | undefined>;
}

export { IAddAccount, IAddAccountModel };
