import validator from "validator";
import { IEmailValidator } from "../protocols";
import { EmailValidatorAdapter } from "./email-validator-adapter";

jest.mock("validator", () => ({
  isEmail(): boolean {
    return true;
  },
}));

const makeSut = (): IEmailValidator => {
  return new EmailValidatorAdapter();
};
describe("EmailValidator", () => {
  test("It should return false if validator returns false", () => {
    const sut = makeSut();
    jest.spyOn(validator, "isEmail").mockReturnValueOnce(false);
    const isValid = sut.isValid("invalid_email");
    expect(isValid).toBe(false);
  });

  test("It should return true if validator returns true", () => {
    const sut = makeSut();
    const isValid = sut.isValid("invalid_email@mail.com");
    expect(isValid).toBe(true);
  });

  test("It should call validator with correct email", () => {
    const sut = makeSut();
    const isEmailSpy = jest.spyOn(validator, "isEmail");
    sut.isValid("any_email@mail.com");
    expect(isEmailSpy).toHaveBeenCalledWith("any_email@mail.com");
  });
});
