import { AccountModel } from "../../../domain/models/account";
import {
  IAddAccount,
  IAddAccountModel,
} from "../../../domain/usecases/add-account";
import { DBAddAccount } from "./db-add-account";

describe("DBAddAccount UseCase", () => {
  test("Should call Encrypter with correct password", () => {
    class EncrypterStub implements IAddAccount {
      async add({
        email,
        name,
        password,
      }: IAddAccountModel): Promise<AccountModel> {
        throw new Error("Method not implemented.");
      }
      async encrypt(value: string): Promise<string> {
        return new Promise((resolve) => resolve("hashed_password"));
      }
    }
    const encrypterStub = new EncrypterStub();
    const sut = new DBAddAccount(encrypterStub);
    const encryptSpy = jest.spyOn(encrypterStub, "encrypt");

    const accountData = {
      name: "valid_name",
      email: "valid_email",
      password: "valid_password",
    };

    sut.add(accountData);
    expect(encryptSpy).toHaveBeenCalledWith("valid_password");
  });
});
