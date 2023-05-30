import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
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
import { FlightInfo } from '../models/reserve.model';
import DataSource from 'devextreme/data/data_source';

@Component({
  selector: 'app-flight-info',
  templateUrl: './flight-info.component.html',
  styleUrls: ['./flight-info.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlightInfoComponent implements OnInit, OnDestroy {
  flightInfoForm = new FormGroup({
    flightDate: new FormControl(new Date(), Validators.required),
    flightType: new FormControl(null, Validators.required),
    flightName: new FormControl('', Validators.required),
    flightTime: new FormControl('', Validators.required),
    locationId:new FormControl('', Validators.required),
  });

  min: Date = new Date();
  max: Date = new Date();
  id: string;
  store$: Observable<any>;
  location: any;

  flightNumberSource: any;
  flightTypeSource: ArrayStore;
  flightTypes = [
    { value: 0, label: 'Arrival' },
    { value: 1, label: 'Departure' },
    // ...
  ];
  flightInfoView = false;
  flightInfo: any;
  reserveState: any;
  locations: DataSource;
  constructor(
    private ref: ChangeDetectorRef,
    private service: ReserveService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private store: Store<fromStore.ReserveModuleState>
  ) {
    this.flightTypeSource = new ArrayStore({
      key: 'value',
      data: this.flightTypes,
    });

    this.store$ = store.select<any>('reserve');

    this.loadList(http, service);
  }
  ngOnDestroy(): void {
    this.reserveState = null;
  }

  ngOnInit(): void {
    // this.store.dispatch(fromAction.LoadLocation({ locationId: this.id }));
    this.store$.subscribe((sub) => {
      this.reserveState = sub.reserve;
      if (!sub.reserve.ServiceLine) {
        if (sub.reserve.FlightInfo) {
          this.store.dispatch(
            fromAction.LoadServiceLineInReserve({
              locationId: sub.reserve.FlightInfo.locationId,
              flightDate: sub.reserve.FlightInfo.flightDate,
            })
          );
        }
      }
      this.location = sub.reserve.LocationId;
      if (
        sub.reserve &&
        sub.reserve.LocationId &&
        sub.reserve.LocationId.maxAcceptDate
      ) {
        this.max = sub.reserve.LocationId.maxAcceptDate;
      }
      if (sub.reserve && sub.reserve.FlightInfo) {




     















        this.flightInfo = sub.reserve.FlightInfo;

        this.flightInfoForm = new FormGroup({
          flightDate: new FormControl(
            this.flightInfo.flightDate,
            Validators.required
          ),
          flightType: new FormControl(
            this.flightInfo.flightType,
            Validators.required
          ),
          flightName: new FormControl(this.flightInfo.id, Validators.required),
          locationId: new FormControl(sub.reserve.LocationId.id, Validators.required),
          flightTime: new FormControl(
            this.flightInfo.flightType === 0
              ? this.flightInfo.arrivalTime
              : this.flightInfo.departureTime,
            Validators.required
          ),
        });
      }
      this.ref.markForCheck();
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

  //-------------------------------------------------
  flightNumberChanged($event: any) {
    var item = $event.selectedItem;
    // this.service.setflightTypeObs('');
    let flightdate1 = this.flightInfoForm.controls.flightDate;
    this.flightInfo = {
      id: item.id,
      flightName: item.flightName,
      flightDate: flightdate1.value,
      airlineName: item.airlineName,
      status: item.status,
      scheduled: item.scheduled,
      flightType: "",
      flightSource: item.flightSource,
      departureAirport: item.departureAirport.name,
      departureCity: item.departureAirport.city,
      arrivalAirport: item.arrivalAirport.name,
      arrivalCity:  item.arrivalAirport.city,
      arrivalTime: item.arrivalTime,
      departureTime: item.departureTime,
      departureAirportId:item.departureAirportId,
      arrivalAirportId:item.arrivalAirportId,
    };
    // var flightInfo = {
    //   FlightInfo: flight,
    // };
    this.store.dispatch(fromAction.SetFlightInfo({FlightInfo:  this.flightInfo}));

    // this.store.dispatch(
    //   fromAction.SaveState({
    //     state: this.reserveState,
    //   })
    // );



  }
  flightTypeChanged($event: any) {




    if(!$event.selectedItem){
     return;
    }



    var type = $event.selectedItem.value;
    var flight=JSON.parse(JSON.stringify(this.flightInfo));
    flight.flightType=type;



    this.service.setflightTypeObs(type + '');

    lastValueFrom(
      this.http.get(
        `${environment.serviceLocationAddress}/ServiceLocation?AccountId=&SearchTerm=&PageNumber=1&PageSize=500&OrderBy=Title`
      )
    )
      .then((data: any) => {
      
        console.log(data,this.flightInfo);

        this.flightInfoForm.controls.flightTime.setValue(
          type + 0 === 0 ? this.flightInfo.arrivalTime : this.flightInfo.departureTime
        );
        this.flightInfoForm.controls.locationId.setValue(
          ''
        );

        if (type + '' === '0') {
          this.locations = data.filter((data: any) => {
            return (
              !data.doNotShowInReserveLocationList &&
              data.airportId.toLocaleLowerCase() ===
                this.flightInfo.arrivalAirportId.toLocaleLowerCase()
            );
          });
        } else {
          this.locations = data.filter((data: any) => {
            return (
              !data.doNotShowInReserveLocationList &&
              data.airportId.toLocaleLowerCase() ===
                this.flightInfo.departureAirportId.toLocaleLowerCase()
            );
          });
        }
      })
      .catch((error) => {
        throw 'Data Loading Error';
      });




  }

  flightDate($event: any) {


    var flight=JSON.parse(JSON.stringify(this.flightInfo));
    flight. flightDate= $event.value;
    
    this.store.dispatch(fromAction.SetFlightInfo({FlightInfo:flight}));


    this.service.setreserveDateObs($event.value);
    // var flightInfo = { ...this.reserveState.FlightInfo };
    // if (flightInfo) {
    //   flightInfo.flightDate = $event.value;
    //   this.store.dispatch(fromAction.SetFlightInfo({ FlightInfo: flightInfo }));
    // }

    // if (this.location.id) {
    //   this.store.dispatch(
    //     fromAction.LoadServiceLineInReserve({
    //       locationId: this.location.id,
    //       flightDate: $event.value,
    //     })
    //   );
    // } else {
    //   this.store.dispatch(
    //     fromAction.LoadServiceLineInReserve({
    //       locationId: this.location,
    //       flightDate: $event.value,
    //     })
    //   );
    //}
    // this.store.dispatch(
    //   fromAction.SaveState({
    //     state: this.reserveState,
    //   })
    // );
  }
  updateFlightTime($event: any) {
    console.log($event.target.value);
  }
  locationChanged(event:any){


console.log(event.selectedItem);
var flight=JSON.parse(JSON.stringify(this.flightInfo));
flight.locationId=event.selectedItem.id;
flight.flightType=this.flightInfoForm.controls.flightType.value;

this.store.dispatch(fromAction.SetFlightInfo({FlightInfo:flight}));
this.store.dispatch(fromAction.SetLocation({location: event.selectedItem}));
this.store.dispatch(fromAction.LoadLocation( {locationId: event.selectedItem.id}))

  }
}
