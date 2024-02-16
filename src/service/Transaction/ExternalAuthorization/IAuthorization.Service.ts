export interface AuthorizationService {
  authorizeTransaction(): Promise<boolean>;
}
