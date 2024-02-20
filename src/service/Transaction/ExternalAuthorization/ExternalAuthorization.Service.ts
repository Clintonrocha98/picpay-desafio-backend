import { AuthorizationService } from "./IAuthorization.service";

export class ExternalAuthorizationService implements AuthorizationService {
  async authorizeTransaction(): Promise<boolean> {
    const response = await fetch(
      "https://run.mocky.io/v3/5794d450-d2e2-4412-8131-73d0293ac1cc"
    );
    const data = await response.json();
    
    return data.message === "Autorizado";
  }
}
