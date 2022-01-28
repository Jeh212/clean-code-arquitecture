import { MissinParamError } from "../erros/missing-param-error";
import { HttpRequest, HttpResponse } from "../protocols/http";

export class SignUpController {
  handle(httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return {
        statusCode: 400,
        body: new MissinParamError("Missing param: name"),
      };
    }
    if (!httpRequest.body.email) {
      return {
        statusCode: 400,
        body: new MissinParamError("Missing param: EMAIL"),
      };
    }
    if (!httpRequest.body.password) {
      return {
        statusCode: 400,
        body: new MissinParamError("Missing param: password"),
      };
    }
  }
}
