import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({ providedIn: 'root' })
export class PaymentService {
  getReservePayment(id: any) {
    console.log('DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD');

    console.log(
      `${environment.ReserveAddress}/payment/daea4e36-52c3-4734-86be-829fa031be73/Payment`
    );

    return this.httpClient.get<any>(
      `${environment.ReserveAddress}/payment/${id}/payment`
    );
  }
  constructor(private httpClient: HttpClient) {}

  getReserve(item: string) {
    return this.httpClient.get<any>(
      `${environment.ReserveAddress}/reserve/${item}`
    );
  }
  getAccount(contactId: string) {
    return this.httpClient.get<any>(
      `${environment.FinancialAddress}/FinancialAccount/${contactId}/Credit`
    );
  }
  PayReserve(contactId: string) {
    return this.httpClient.get<any>(
      `${environment.FinancialAddress}/reserve/${contactId}/Payment`
    );
  }
}
