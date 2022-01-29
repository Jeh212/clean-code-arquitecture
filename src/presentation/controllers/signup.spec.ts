import { SignUpController } from "../controllers/signup";
import { InvalidParamError } from "../erros/invalide-param-error";
import { IEmailValidator } from "../protocols/email-validator";

interface SutTypes {
  sut: SignUpController;
  emailValidatorStub: IEmailValidator;
}

const makeSut = (): SutTypes => {
  class EmailValidator implements IEmailValidator {
    isValid(email: string): boolean {
      return true;
    }
  }

  const emailValidatorStub = new EmailValidator();
  const sut = new SignUpController(emailValidatorStub);
  return {
    sut,
    emailValidatorStub,
  };
};
describe("SignUp Controller", () => {
  test("It should return 400 if no name was provided", () => {
    const { sut } = makeSut();

    const httpRequest = {
      body: {
        email: "any_email@mail.com",
        password: "any_password",
        passwordConfirmation: "any_password",
      },
    };

    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new Error("name"));
  });
  test("It should return 400 if no email was provided", () => {
    const { sut } = makeSut();

    const httpRequest = {
      body: {
        name: "any_name",
        password: "any_password",
        passwordConfirmation: "any_password",
      },
    };

    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.body).toEqual(new Error("email"));
    expect(httpResponse.statusCode).toBe(400);
  });

  test("It should return 400 if no password was provided", () => {
    const { sut } = makeSut();

    const httpRequest = {
      body: {
        name: "any_name",
        email: "any_email@mail.com",
        passwordConfirmation: "any_password",
      },
    };

    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.body).toEqual(new Error("password"));
    expect(httpResponse.statusCode).toBe(400);
  });

  test("It should return 400 if no password confirmation was provided", () => {
    const { sut } = makeSut();

    const httpRequest = {
      body: {
        name: "any_name",
        password: "any_password",
        email: "any_email@mail.com",
      },
    };

    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.body).toEqual(new Error("passwordConfirmation"));
    expect(httpResponse.statusCode).toBe(400);
  });

  test("It should return 400 if invalid email was provided", () => {
    const { sut, emailValidatorStub } = makeSut();

    jest.spyOn(emailValidatorStub, "isValid").mockReturnValueOnce(false);

    const httpRequest = {
      body: {
        name: "any_name",
        email: "invalid_email@mail.com",
        password: "any_password",
        passwordConfirmation: "any_password",
      },
    };

    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.body).toEqual(new InvalidParamError("email"));
    expect(httpResponse.statusCode).toBe(400);
  });

  test("It should call EmailValidator with correct email", () => {
    const { sut, emailValidatorStub } = makeSut();

    const isValidSpy = jest.spyOn(emailValidatorStub, "isValid");

    const httpRequest = {
      body: {
        name: "any_name",
        email: "any_email@mail.com",
        password: "any_password",
        passwordConfirmation: "any_password",
      },
    };

    sut.handle(httpRequest);
    expect(isValidSpy).toHaveBeenCalledWith("any_email@mail.com");
  });
});
