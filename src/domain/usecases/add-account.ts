import { AccountModel } from "../domain/account";

interface IAddAccountModel {
  name: string;
  email: string;
  password: string;
}

interface IAddAccount {
  add({ email, name, password }: IAddAccountModel): AccountModel;
}

export { IAddAccount, IAddAccountModel };
