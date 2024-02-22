import { ApiError } from "../../../helpers/api.errors";

export class UnauthorizedTransaction extends ApiError {
  constructor(message: string) {
    super(message, 401);
  }
}
