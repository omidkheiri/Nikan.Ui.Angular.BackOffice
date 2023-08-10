import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({ providedIn: 'root' })
export class PaymentService {
  CancelReserve(tripId: any,reserveId:any) {
    return this.httpClient.get<any>(
      `${environment.ReserveAddress}/trip/${tripId}/reserverecord/${reserveId}/cancel`
    );
  }
  getReservePayment(id: any) {
    return this.httpClient.get<any>(
      `${environment.ReserveAddress}/payment/${id}/payment`
    );
  }
  constructor(private httpClient: HttpClient) {}

  getReserve(item: string) {
    return this.httpClient.get<any>(
      `${environment.ReserveAddress}/trip/${item}`
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


  cancelReserveItem(tripId:string,reserverecordid:string,reserveitemid:string,ItemCancelRequest:any) {
    return this.httpClient.post<any>(
      `${environment.ReserveAddress}/trip/${tripId}/reserverecord/${reserverecordid}/reserveitem/${reserveitemid}/cancel`
    ,ItemCancelRequest);
  }




}
