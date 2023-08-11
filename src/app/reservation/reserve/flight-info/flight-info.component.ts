import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';
import ArrayStore from 'devextreme/data/array_store';
import CustomStore from 'devextreme/data/custom_store';
import { lastValueFrom, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import * as fromStore from '../../store';
import * as fromAction from '../../store/reserve.action';
import { ReserveService } from '../../service/reserve.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { validate } from 'ngrx-forms';
import { FlightInfo } from '../models/FlightInfo';
import DataSource from 'devextreme/data/data_source';
import { Trip } from '../models/Trip';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-flight-info',
  templateUrl: './flight-info.component.html',
  styleUrls: ['./flight-info.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlightInfoComponent
  implements OnInit, OnDestroy, AfterViewInit, OnChanges
{
  mode: string = '';

  flightInfoForm = new FormGroup({
    flightDate: new FormControl(null, Validators.required),
    flightType: new FormControl('', Validators.required),
    flightName: new FormControl('', Validators.required),
    flightTime: new FormControl('', Validators.required),
    arrivalLocationId: new FormControl(''),
    departureLocationId: new FormControl(''),
  });
  arrivalLocation: any;
  departureLocation: any;
  min: Date = new Date();
  max: Date = new Date();
  id: string;
  store$: Observable<any>;
  location: any;

  flightNumberSource: any;
  flightTypeSource: ArrayStore;

  flightInfoView = false;

  trip: Trip;
  ArrivalLocations: DataSource | any;
  DepartureLocations: DataSource | any;
  constructor(
    private ref: ChangeDetectorRef,
    private service: ReserveService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private store: Store<fromStore.ReserveModuleState>
  ){
    this.store$ = store.select<any>('reserve');

    this.loadList(http, service);
  }

  ngOnDestroy(): void {
    // this.trip = null;
  }

  ngOnInit(): void {
    this.getLocationList();
    this.store$.subscribe((sub) => {
      this.mode = sub.reserve.formMode;
      this.trip = sub.reserve.trip;

      if (
        sub.reserve.trip &&
        sub.reserve.trip.flightInfo &&
        sub.reserve.trip.flightInfo.flightDate
      ) {
        this.flightInfoForm.controls.flightDate.setValue(
          sub.reserve.trip.flightInfo.flightDate
        );
      }
      if (
        sub.reserve.trip &&
        sub.reserve.trip.flightInfo &&
        sub.reserve.trip.flightInfo.flightName
      ) {
        this.flightInfoForm.controls.flightName.setValue(
          sub.reserve.trip.flightInfo.id
        );
      }

      if (
        !sub.reserve.arrivalServiceLine ||
        !sub.reserve.departureServiceLine
      ) {
        if (sub.reserve.trip && sub.reserve.trip.flightInfo) {
          if (sub.reserve.trip.flightInfo.arrivalLocationId) {
            this.store.dispatch(
              fromAction.LoadArrivalServiceLineInReserve({
                locationId: sub.reserve.trip.flightInfo.arrivalLocationId,
                flightDate: sub.reserve.trip.flightInfo.flightDate,
              })
            );
          }
          if (sub.reserve.trip.flightInfo.departureLocationId) {
            this.store.dispatch(
              fromAction.LoadDepartureServiceLineInReserve({
                locationId: sub.reserve.trip.flightInfo.departureLocationId,
                flightDate: sub.reserve.trip.flightInfo.flightDate,
              })
            );
          }
        }
      }

      if (
        sub.reserve &&
        sub.reserve.locationId &&
        sub.reserve.locationId.maxAcceptDate
      ) {
        this.max = sub.reserve.locationId.maxAcceptDate;
      }
      this.arrivalLocation =
        this.trip &&
        this.trip.flightInfo &&
        this.trip.flightInfo.arrivalLocationId
          ? this.trip.flightInfo.arrivalLocationId
          : '';
      this.departureLocation =
        this.trip &&
        this.trip.flightInfo &&
        this.trip.flightInfo.departureLocationId
          ? this.trip.flightInfo.departureLocationId
          : '';

      this.ref.markForCheck();
    });
  }

  getLocationList() {
    this.http
      .get(
        `${environment.serviceLocationAddress}/ServiceLocation?accountId=&SearchTerm=&PageNumber=1&PageSize=500&OrderBy=Title`
      )
      .subscribe((data1: any) => {
        this.ArrivalLocations = data1.filter((data: any) => {
          return (
            !data.doNotShow &&
            data.airportId &&
            data.airportId.toLocaleLowerCase() ===
              this.trip.flightInfo.arrivalAirportId.toLocaleLowerCase()
          );
        });
        this.DepartureLocations = data1.filter((data: any) => {
          return (
            !data.doNotShow &&
            data.airportId &&
            data.airportId.toLocaleLowerCase() ===
              this.trip.flightInfo.departureAirportId.toLocaleLowerCase()
          );
        });

        this.arrivalLocation =
          this.trip &&
          this.trip.flightInfo &&
          this.trip.flightInfo.arrivalLocationId
            ? this.trip.flightInfo.arrivalLocationId
            : '';
        this.departureLocation =
          this.trip &&
          this.trip.flightInfo &&
          this.trip.flightInfo.departureLocationId
            ? this.trip.flightInfo.departureLocationId
            : '';
      });
  }

 
  loadList(http: HttpClient, service: ReserveService) {
    this.flightNumberSource = new CustomStore({
      key: 'id',
      byKey(key) {
        return http
          .get<any>(`${environment.flightAddress}/FlightNumber/${key}`)
          .toPromise();
      },

      load(loadOptions: any) {
        return lastValueFrom(service.getFlightNumber(loadOptions.searchValue))
          .then((data: any) => data)
          .catch((error) => {
            throw 'Data Loading Error';
          });
      },
    });
  }

  flightNumberChanged($event: any) {
    var item = $event.selectedItem;

    let flightDate1 = this.flightInfoForm.controls.flightDate;

    this.http
      .get(
        `${environment.serviceLocationAddress}/ServiceLocation?accountId=&SearchTerm=&PageNumber=1&PageSize=500&OrderBy=Title`
      )
      .subscribe((data1: any) => {
        var flightInfo = {
          id: item.id,
          flightName: item.flightName,
          flightDate: flightDate1.value,
          airlineName: item.airlineName,
          airlineId: item.airlineId,
          status: item.status,
          scheduled: item.scheduled,
          flightType: 0,
          flightSource: item.flightSource ? item.flightSource : 0,
          departureAirport: item.departureAirport.name,
          departureCity: item.departureAirport.city,
          arrivalAirport: item.arrivalAirport.name,
          arrivalCity: item.arrivalAirport.city,
          arrivalTime: item.arrivalTime,
          departureTime: item.departureTime,
          departureAirportId: item.departureAirportId,
          arrivalAirportId: item.arrivalAirportId,
          departureLocationId:
            this.trip &&
            this.trip.flightInfo &&
            this.trip.flightInfo.departureLocationId
              ? this.trip.flightInfo.departureLocationId
              : '',
          arrivalLocationId:
            this.trip &&
            this.trip.flightInfo &&
            this.trip.flightInfo.arrivalLocationId
              ? this.trip.flightInfo.arrivalLocationId
              : '',
        };

        this.ArrivalLocations = data1.filter((data: any) => {
          return (
            !data.doNotShow &&
            data.airportId &&
            data.airportId.toLocaleLowerCase() ===
              flightInfo.arrivalAirportId.toLocaleLowerCase()
          );
        });
        this.DepartureLocations = data1.filter((data: any) => {
          return (
            !data.doNotShow &&
            data.airportId &&
            data.airportId.toLocaleLowerCase() ===
              flightInfo.departureAirportId.toLocaleLowerCase()
          );
        });

        this.arrivalLocation =
          this.trip &&
          this.trip.flightInfo &&
          this.trip.flightInfo.arrivalLocationId
            ? this.trip.flightInfo.arrivalLocationId
            : '';
        this.departureLocation =
          this.trip &&
          this.trip.flightInfo &&
          this.trip.flightInfo.departureLocationId
            ? this.trip.flightInfo.departureLocationId
            : '';
console.log("KKKKKKKKKKKKKKK",flightInfo);

        this.store.dispatch(
          fromAction.SetFlightInfo({ FlightInfo: flightInfo })
        );
      });
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log();
  }

  flightDate($event: any) {
    if (!this.trip) {
      this.store.dispatch(fromAction.addFakeTrip());
    } else {
      var flight = JSON.parse(JSON.stringify(this.trip.flightInfo));
      flight.flightDate = $event.value;

      this.store.dispatch(fromAction.SetFlightInfo({ FlightInfo: flight }));

      this.service.setReserveDateObs($event.value);
    }
  }
  updateFlightTime($event: any) {
    console.log($event.target.value);
  }

  ngAfterViewInit(): void {}
  DepartureLocation: any;

  onDepartureLocation(e: any) {
    this.DepartureLocation = this.DepartureLocations.find((data: any) => {
      return data.id == e;
    });

    var flightInfo = JSON.parse(JSON.stringify(this.trip.flightInfo));

if(this.DepartureLocation.excludeAirlines.find((data:any)=>{return data.airlineId==flightInfo.airlineId})){

Swal.fire({text:`این تامین کننده قادر به ارائه سرویس برای پروازهای ${this.trip.flightInfo.airlineName} نمیباشد`});

this.departureLocation=null ;
return;
}



    flightInfo.departureLocationId = this.DepartureLocation
      ? this.DepartureLocation.id
      : '';
    flightInfo.flightDate = this.flightInfoForm.controls.flightDate.value;
    this.store.dispatch(
      fromAction.SetDepartureLocation({
        oldLocationValue: this.trip.flightInfo.departureLocationId,
        FlightInfo: flightInfo,
      })
    );
  }
  ArrivalLocation: any;
  onArrivalLocation(e: any) {
    this.ArrivalLocation = this.ArrivalLocations.find((data: any) => {
      return data.id == e;
    });
    
    var flightInfo = JSON.parse(JSON.stringify(this.trip.flightInfo));

if(this.ArrivalLocation.excludeAirlines.find((data:any)=>{return data.airlineId==flightInfo.airlineId})){

Swal.fire({text:`این تامین کننده قادر به ارائه سرویس برای پروازهای ${this.trip.flightInfo.airlineName} نمیباشد`});

this.ArrivalLocation=null ;
return;
}

    if(this.ArrivalLocation.excludeAirlines.find((data:any)=>{return data.airlineId==flightInfo})){
    
    Swal.fire({text:`این تامین کننده قادر به ارائه سرویس برای پروازهای ${this.trip.flightInfo.airlineName} نمیباشد`})
    return;
    
    }
    var flightInfo = JSON.parse(JSON.stringify(this.trip.flightInfo));
    flightInfo.arrivalLocationId = this.ArrivalLocation
      ? this.ArrivalLocation.id
      : '';

    flightInfo.flightDate = this.flightInfoForm.controls.flightDate.value;
    this.store.dispatch(
      fromAction.SetArrivalLocation({
        oldLocationValue: this.trip.flightInfo.arrivalLocationId,
        FlightInfo: flightInfo,
      })
    );
  }
  arrivalDate(): Date {
    if (!this.trip.flightInfo.flightDate) {
      return new Date();
    }
    var arrivalHHTime = Number(this.trip.flightInfo.arrivalTime.split(':')[0]);
    var arrivalMMTime = Number(this.trip.flightInfo.arrivalTime.split(':')[1]);
    var date: Date = this.trip.flightInfo.flightDate;
    console.log('date:', date);

    var arrivalDateTime = new Date(date);
    arrivalDateTime.setHours(arrivalHHTime, arrivalMMTime);
    var DepartureHHTime = Number(
      this.trip.flightInfo.departureTime.split(':')[0]
    );
    var DepartureMMTime = Number(
      this.trip.flightInfo.departureTime.split(':')[1]
    );
    var departureDateTime = new Date(date);
    departureDateTime.setHours(DepartureHHTime, DepartureMMTime);

    if (arrivalDateTime < departureDateTime) {
      try {
        arrivalDateTime.setDate(date.getDate() + 1);
      } catch {}
    }
    console.log(this.trip.flightInfo.flightDate);

    return arrivalDateTime;
  }
}
