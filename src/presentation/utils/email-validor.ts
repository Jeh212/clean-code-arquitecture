import { IEmailValidator } from "../protocols/email-validator";

class EmailValidatorAdapter implements IEmailValidator {
  isValid(email: string): boolean {
    return false;
  }
}

export { EmailValidatorAdapter };
