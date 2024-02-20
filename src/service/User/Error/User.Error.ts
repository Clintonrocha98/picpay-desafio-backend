import { ApiError } from "../../../helpers/api.errors";

export class InvalidEmail extends ApiError {
  constructor(message: string) {
    super(message, 401);
  }
}

export class InvalidDocument extends ApiError {
  constructor(message: string) {
    super(message, 401);
  }
}
