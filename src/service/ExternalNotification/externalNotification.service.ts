import {
  INotificationService,
  userProp,
} from "./IExternalNotification.service";

export class ExternalNotificationService implements INotificationService {
  async notification(
    payee: userProp,
    payer: userProp,
    amount: number
  ): Promise<void> {
    const response = await fetch(
      "https://run.mocky.io/v3/54dc2cf1-3add-45b5-b5a9-6bf7e7f1f4a6"
    );
    const data = await response.json();

    if (data.message) {
      console.log(
        `
        De: ${payer.firstname} ${payer.lastname} - ${payer.email},
        Para: ${payee.firstname} ${payee.lastname} - ${payee.email},
        ${payer.firstname} ${payer.lastname} enviou ${amount.toLocaleString(
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
