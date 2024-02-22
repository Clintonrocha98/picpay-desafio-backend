export interface IAuthorizationService {
  authorizeTransaction(): Promise<boolean>;
}
