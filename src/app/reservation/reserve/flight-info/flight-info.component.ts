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
import { lastValueFrom, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import * as fromStore from '../../store';
import * as fromAction from '../../store/reserve.action';
import { ReserveService } from '../../service/reserve.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { validate } from 'ngrx-forms';
import { FlightInfo } from '../models/FlightInfo';
import DataSource from 'devextreme/data/data_source';
import { Trip } from '../models/Trip';

@Component({
  selector: 'app-flight-info',
  templateUrl: './flight-info.component.html',
  styleUrls: ['./flight-info.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlightInfoComponent
  implements OnInit, OnDestroy, AfterViewInit, OnChanges
{
  flightInfoForm = new FormGroup({
    flightDate: new FormControl(null, Validators.required),
    flightType: new FormControl('', Validators.required),
    flightName: new FormControl('', Validators.required),
    flightTime: new FormControl('', Validators.required),
    arrivalLocationId: new FormControl(''),
    departureLocationId: new FormControl(''),
  });
  arrivalLocation:any;
  departureLocation:any;
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
  ) {
    this.store$ = store.select<any>('reserve');

    this.loadList(http, service);
  }

  ngOnDestroy(): void {
    // this.trip = null;
  }

  ngOnInit(): void {
    this.store$.subscribe((sub) => {
      this.trip = sub.reserve.trip;

      if (sub.reserve.trip.flightInfo.flightDate) {
        this.flightInfoForm.controls.flightDate.setValue(
          sub.reserve.trip.flightInfo.flightDate
        );
      }
      if (sub.reserve.trip.flightInfo.flightName) {
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
        sub.reserve.LocationId &&
        sub.reserve.LocationId.maxAcceptDate
      ) {
        this.max = sub.reserve.LocationId.maxAcceptDate;
      }

      this.ref.markForCheck();
    });
    console.log(this.trip);
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
        `${environment.serviceLocationAddress}/ServiceLocation?AccountId=&SearchTerm=&PageNumber=1&PageSize=500&OrderBy=Title`
      ).subscribe((data1: any) => {
        var flightInfo = {
          id: item.id,
          flightName: item.flightName,
          flightDate: flightDate1.value,
          airlineName: item.airlineName,
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
          departureLocationId:this.trip&&this.trip.flightInfo&& this.trip.flightInfo.departureLocationId?this.trip.flightInfo.departureLocationId:"",
          arrivalLocationId:  this.trip&&this.trip.flightInfo&&this.trip.flightInfo.arrivalLocationId?this.trip.flightInfo.arrivalLocationId:"",
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

        this.arrivalLocation= this.trip&& this.trip.flightInfo&& this.trip.flightInfo.arrivalLocationId?this.trip.flightInfo.arrivalLocationId:'';
        this.departureLocation=this.trip&&this.trip.flightInfo&&this.trip.flightInfo.departureLocationId?this.trip.flightInfo.departureLocationId:'';
           



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
    flightInfo.departureLocationId = this.DepartureLocation
      ? this.DepartureLocation.id
      : '';
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
    flightInfo.arrivalLocationId = this.ArrivalLocation
      ? this.ArrivalLocation.id
      : '';
    this.store.dispatch(
      fromAction.SetArrivalLocation({
        oldLocationValue: this.trip.flightInfo.arrivalLocationId,
        FlightInfo: flightInfo,
      })
    );
  }
}
