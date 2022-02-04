import { IEncrypter } from "../../protocols/encrypter";
import { DBAddAccount } from "./db-add-account";

interface ISutTypes {
  sut: DBAddAccount;
  encryptStub: IEncrypter;
}

const makeSut = (): ISutTypes => {
  class EncrypterStub {
    async encrypt(value: string): Promise<string> {
      return new Promise((resolve) => resolve("hashed_password"));
    }
  }

  const encryptStub = new EncrypterStub();
  const sut = new DBAddAccount(encryptStub);

  return {
    sut,
    encryptStub,
  };
};
describe("DBAddAccount UseCase", () => {
  test("Should call Encrypter with correct password", () => {
    const { encryptStub, sut } = makeSut();
    const encryptSpy = jest.spyOn(encryptStub, "encrypt");

    const accountData = {
      name: "valid_name",
      email: "valid_email",
      password: "valid_password",
    };

    sut.add(accountData);
    expect(encryptSpy).toHaveBeenCalledWith("valid_password");
  });
});