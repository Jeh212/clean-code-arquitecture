import { IEncrypter } from "../../protocols/encrypter";
import { DBAddAccount } from "./db-add-account";

interface ISutTypes {
  sut: DBAddAccount;
  encryptStub: IEncrypter;
}

const makeEncrypter = (): IEncrypter => {
  class EncrypterStub implements IEncrypter {
    async encrypt(value: string): Promise<string> {
      return new Promise((resolve) => resolve("hashed_password"));
    }
  }
  return new EncrypterStub();
};

const makeSut = (): ISutTypes => {
  const encryptStub = makeEncrypter();
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
  test("Should throws if Encrypter throws", () => {
    const { encryptStub, sut } = makeSut();
    jest
      .spyOn(encryptStub, "encrypt")
      .mockRejectedValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      );

    const accountData = {
      name: "valid_name",
      email: "valid_email",
      password: "valid_password",
    };

    const promise = sut.add(accountData);
    expect(promise).rejects.toThrow();
  });
});
