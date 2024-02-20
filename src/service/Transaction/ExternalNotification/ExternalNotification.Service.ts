import User from "../../../models/user/User";
import { NotificationService } from "./IExternalNotification.service";

export class ExternalNotificationService implements NotificationService {
  async notification(payer: User, payee: User, amount: number): Promise<void> {
    const response = await fetch(
      "https://run.mocky.io/v3/54dc2cf1-3add-45b5-b5a9-6bf7e7f1f4a6"
    );
    const data = await response.json();
    if (data.message) {
      console.log(
        `
        De: ${payer.firstName} ${payer.lastName} - ${payer.email},
        Para: ${payee.firstName} ${payee.lastName} - ${payee.email},
        ${payer.firstName} ${payer.lastName} enviou ${amount.toLocaleString(
          "pt-BR",
          {
            style: "currency",
            currency: "BRL",
          }
        )}
        `
      );
    } else {
      console.log("Problema ao enviar a notificação pelo email");
    }
  }
}
