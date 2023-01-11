import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as Moment from 'moment';
import { BehaviorSubject, catchError, map, Observable } from 'rxjs';
import { __values } from 'tslib';
@Injectable({
  providedIn: 'root',
})
export class ReserveService {
  constructor(private http: HttpClient) {}

  private reserveDate = new BehaviorSubject(new Date());
  setreserveDateObs(reserveDate: Date) {
    this.reserveDate.next(reserveDate);
  }
  getreserveDateObs(): Observable<Date> {
    return this.reserveDate.asObservable();
  }

  private reserveCustomerAccountId = new BehaviorSubject('');
  setreserveCustomerIdObs(reserveCustomerAccountId: string) {
    this.reserveCustomerAccountId.next(reserveCustomerAccountId);
  }
  getreserveCustomerIdObs(): Observable<string> {
    return this.reserveCustomerAccountId.asObservable();
  }

  private flightType = new BehaviorSubject('0');
  setflightTypeObs(flightType: string) {
    this.flightType.next(flightType);
  }
  getflightTypeObs(): Observable<string> {
    return this.flightType.asObservable();
  }
  getFlightNumber(searchValue: string) {
    return this.http.get<any>(
      `${
        environment.flightAddress
      }/FlightNumber/SelectList?SearchTerm=${searchValue}&FlightDate=${
        this.reserveDate
          ? Moment(this.reserveDate.getValue()).format('YYYY-MM-DD')
          : null
      }&FlightType=${this.flightType.getValue()}`
    );
  }

  addPayment(contactId: string, value: any): Observable<any> {
    return this.http.post(
      `${environment.FinancialAddress}/BankPayment/${contactId}`,
      JSON.parse(JSON.stringify(value))
    );
  }

  getContact(contavtId: string) {
    return this.http.get<any>(
      `${environment.accountAddress}/contact/${contavtId}`
    );
  }
}
