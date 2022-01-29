import { InvalidParamError, MissinParamError } from "../erros";
import { badRequest, serverError } from "../helpers/http-helper";
import {
  HttpRequest,
  HttpResponse,
  IController,
  IEmailValidator,
} from "../protocols";

export class SignUpController implements IController {
  private readonly emailValidator: IEmailValidator;

  constructor(emailValidator: IEmailValidator) {
    this.emailValidator = emailValidator;
  }

  handle(httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = [
        "name",
        "email",
        "password",
        "passwordConfirmation",
      ];

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissinParamError(field));
        }
      }

      const isValid = this.emailValidator.isValid(httpRequest.body.email);

      if (!isValid) {
        return badRequest(new InvalidParamError("email"));
      }
      return {};
    } catch (error) {
      return serverError();
    }
  }
}
