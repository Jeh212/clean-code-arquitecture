import {
  AccountModel,
  IAddAccount,
  IAddAccountModel,
  IEncrypter,
} from "./db-add-account-protocols";

class DBAddAccount implements IAddAccount {
  private readonly encrypter: IEncrypter;

  constructor(encrypter: IEncrypter) {
    this.encrypter = encrypter;
  }

  async add(account: IAddAccountModel): Promise<AccountModel | undefined> {
    await this.encrypter.encrypt(account.password);
    return new Promise((resolve) => resolve(undefined));
  }
}

export { DBAddAccount };
