import validator from "validator";
import { EmailValidatorAdapter } from "./email-validor";

jest.mock("validator", () => ({
  isEmail(): boolean {
    return true;
  },
}));
describe("EmailValidator", () => {
  test("It should return false if validator returns false", () => {
    const sut = new EmailValidatorAdapter();
    jest.spyOn(validator, "isEmail").mockReturnValueOnce(false);
    const isValid = sut.isValid("invalid_email");
    expect(isValid).toBe(false);
  });

  test("It should return true if validator returns true", () => {
    const sut = new EmailValidatorAdapter();
    const isValid = sut.isValid("invalid_email@mail.com");
    expect(isValid).toBe(true);
  });

  test("It should call validator with correct email", () => {
    const sut = new EmailValidatorAdapter();
    const isEmailSpy = jest.spyOn(validator, "isEmail");
    sut.isValid("any_email@mail.com");
    expect(isEmailSpy).toHaveBeenCalledWith("any_email@mail.com");
  });
});
