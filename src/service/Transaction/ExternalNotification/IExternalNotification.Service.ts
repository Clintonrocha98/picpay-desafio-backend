import { User } from "../../../models/user/User";

export interface NotificationService {
  notification(payer: User, payee: User, amount: number): Promise<void>;
}
