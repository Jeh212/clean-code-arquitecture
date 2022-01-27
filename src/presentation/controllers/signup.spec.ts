import { SignUpController } from "../controllers/signup";
describe("SignUp Controller", () => {
  test("It should return 400 if no name was provided", () => {
    const sut = new SignUpController();

    const httpRequest = {
      body: {
        body: "any_name",
        email: "any_email@mail.com",
        password: "any_password",
        passwordConfirmation: "any_password",
      },
    };

    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
  });
});
