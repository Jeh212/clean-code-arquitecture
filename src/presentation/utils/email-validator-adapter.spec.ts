import { EmailValidatorAdapter } from "./email-validor";
describe("EmailValidator", () => {
  test("It should return false if validator returns false", () => {
    const sut = new EmailValidatorAdapter();
    const isValid = sut.isValid("invalid_email@mail.com");
    expect(isValid).toBe(false);
  });
});
