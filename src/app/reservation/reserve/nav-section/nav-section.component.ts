import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import DataSource from 'devextreme/data/data_source';
import { lastValueFrom, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ReserveService } from '../../service/reserve.service';
import * as fromStore from '../../store';
import * as fromAction from '../../store/reserve.action';
import * as uuid from 'uuid';
import { Router } from '@angular/router';
@Component({
  selector: '.navSection',
  templateUrl: './nav-section.component.html',
  styleUrls: ['./nav-section.component.css'],
})
export class NavSectionComponent implements OnInit {
  //{ Title: string; Count: number; Sum: number }
  savedisabled = true;
  items: {
    Title: string;
    Qty: number;
    UnitPrice: number;
    TotalPrice: number;
    serviceLineId: number;
    ServiceTypeName: string;
  }[] = [];
  serviceListSource: [];
  summery: {
    Title: string;
    Qty: number;
    Sum: number;
    serviceLineId: number;
  }[] = [];
  sum: number = 0;
  store$: any;
  dataSource: DataSource;
  reserve: any;
  currentState: any;
  contactId: any;
  formMode: any;
  reserveNumber: any;
  constructor(
    private store: Store<fromStore.ReserveModuleState>,
    private httpClient: HttpClient,
    private service: ReserveService,
    private router: Router
  ) {
    function isNotEmpty(value: any): boolean {
      return value !== undefined && value !== null && value !== '';
    }

    this.dataSource = new DataSource({
      key: 'contactId',
      byKey(key) {
        return service
          .getContact(key)
          .pipe(
            map((data: any) => {
              return {
                companyId: '',
                accountId: data.accountId,

                name: data.name,
                lastName: data.lastName,
                contactId: data.id,
                phone: data.phone,
              };
            })
          )
          .toPromise();
      },
      load(loadOptions: any) {
        let params: HttpParams = new HttpParams();
        [
          'skip',
          'take',
          'requireTotalCount',
          'requireGroupCount',
          'sort',
          'search',
          'filter',
          'totalSummary',
          'group',
          'groupSummary',
        ].forEach((i) => {
          if (i in loadOptions && isNotEmpty(loadOptions[i])) {
            params = params.set(i, JSON.stringify(loadOptions[i]));
          }
        });

        var filter = ``;

        if (loadOptions.searchValue) {
          filter = `skip=0&take=20&requireTotalCount=true&filter=[["lastName","contains","${loadOptions.searchValue}"],"or",["name","contains","${loadOptions.searchValue}"],"or",["emailAddress","contains","${loadOptions.searchValue}"],"or",["phone","contains","${loadOptions.searchValue}"]]`;
        }

        return lastValueFrom(
          httpClient.get(`${environment.baseAddress}/contact?${filter}`)
        )
          .then((data: any) => {
            return {
              data: data.data,
              totalCount: data.totalCount,
              summary: data.summary,
              groupCount: data.groupCount,
            };
          })
          .catch((error) => {
            throw 'Data Loading Error';
          });
      },
    });
    this.store$ = store.select<any>('reserve');
  }
  setSerlectedCustomer(item: any) {
    let newId = uuid.v4();
    if (item.value.contactId) {
      this.store.dispatch(
        fromAction.SetCustomerId({
          contactId: item.value.contactId,
          contactFullName: item.value.name + ' ' + item.value.lastName,
          contactPhone: item.value.phone,
          contactAccountId: item.value.accountId,
          clientReserveId: newId,
        })
      );
      this.store.dispatch(
        fromAction.SaveState({
          state: this.currentState,
        })
      );
    }
  }
  dispalyCustomer(item: any) {
    return item && `${item.name} ${item.lastName} -> ${item.phone}`;
  }

  saveReserve() {
    if (this.formMode === 'new') {
      this.httpClient
        .post(`${environment.ReserveAddress}/Reserve`, this.reserve)
        .subscribe((data: any) => {
          // this.router.navigate([
          //   `/dashboard/reserve/Reserve/${data.id}/${data.locationId.id}`,
          // ]);
          this.reserveNumber = data.reserveNumber;
        });
    }
    if (this.formMode === 'edit') {
      this.httpClient
        .put(
          `${environment.ReserveAddress}/Reserve/${this.reserve.id}`,
          this.reserve
        )
        .subscribe((data: any) => {
          this.reserveNumber = data.reserveNumber;
        });
    }
  }

  ngOnInit(): void {
    this.store$.subscribe((sub: any) => {
      this.currentState = sub.reserve;
      this.savedisabled = !(
        sub.reserve.LocationId &&
        sub.reserve.FlightInfo &&
        sub.reserve.ReserveItem &&
        sub.reserve.contactId
      );
      this.formMode = sub.reserve.formMode;
      this.reserve = sub.reserve;
      this.contactId = sub.reserve.contactId;
      this.service.setreserveCustomerIdObs(sub.reserve.contactAccountId);
      if (sub.reserve.ReserveItem) {
        if (sub.reserve.ServiceLine) {
          this.items = [];

          sub.reserve.ReserveItem.forEach((element: any) => {
            if (element.serviceQty === 0) {
            } else {
              let val = sub.reserve.ServiceLine.find((data: any) => {
                return data.id === element.serviceLineId;
              });

              if (val) {
                this.items.push({
                  Title: val.serviceTypeName,
                  serviceLineId: val.serviceTypeId,
                  ServiceTypeName: val.serviceTypeName,
                  Qty: element.serviceQty,
                  UnitPrice: val.serviceLinePrices[0].price,
                  TotalPrice: element.serviceAdvanceTotal,
                });
              }
            }
          });
          this.summery = [];
          this.items.forEach((element) => {
            let sum: any = this.summery.find((data) => {
              return data.serviceLineId === element.serviceLineId;
            });
            if (sum) {
              sum.Qty += element.Qty;
              sum.Sum += element.TotalPrice;
              this.summery
                .filter((data) => {
                  return data.serviceLineId === element.serviceLineId;
                })
                .push(sum);
            } else {
              this.summery.push({
                Title: element.Title,
                Qty: element.Qty,
                Sum: element.TotalPrice,
                serviceLineId: element.serviceLineId,
              });
            }
          });
          this.sum = 0;
          this.summery
            .sort(function (a, b) {
              var keyA = a.serviceLineId,
                keyB = b.serviceLineId;

              if (keyA < keyB) return -1;
              if (keyA > keyB) return 1;
              return 0;
            })
            .forEach((data) => {
              this.sum += data.Sum;
            });
        }
      }
    });
  }
}
