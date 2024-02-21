export type userProp = {
  firstname: string;
  lastname: string;
  email: string;
};
export interface NotificationService {
  notification(payee: userProp, payer: userProp, amount: number): Promise<void>;
}
