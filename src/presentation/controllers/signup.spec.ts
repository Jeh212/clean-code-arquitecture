import { SignUpController } from "../controllers/signup";
describe("SignUp Controller", () => {
  test("It should return 400 if no name was provided", () => {
    const sut = new SignUpController();

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
    const sut = new SignUpController();

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
    const sut = new SignUpController();

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
});
