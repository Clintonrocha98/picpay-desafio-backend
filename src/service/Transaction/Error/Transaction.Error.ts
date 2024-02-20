import { ApiError } from "../../../helpers/api.errors";

export class PayerInvalid extends ApiError {
  constructor(message: string) {
    super(message, 404);
  }
}
export class PayeeInvalid extends ApiError {
  constructor(message: string) {
    super(message, 404);
  }
}
export class RetailerCannotMakeTransfer extends ApiError {
  constructor(message: string) {
    super(message, 403);
  }
}

export class UnauthorizedTransaction extends ApiError {
  constructor(message: string) {
    super(message, 401);
  }
}
export class PayerDoesNotHaveSufficientBalance extends ApiError {
  constructor(message: string) {
    super(message, 403);
  }
}