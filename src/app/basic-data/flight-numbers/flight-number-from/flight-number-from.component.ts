import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import ArrayStore from 'devextreme/data/array_store';
import CustomStore from 'devextreme/data/custom_store';
import { lastValueFrom, map, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';
import { FlightService } from '../service/flight.service';
import { validate } from 'ngrx-forms';
@Component({
  selector: 'app-flight-number-from',
  templateUrl: './flight-number-from.component.html',
  styleUrls: ['./flight-number-from.component.css'],
})
export class FlightNumberFromComponent implements OnInit {
  airLineNamesDataSource: CustomStore;
  airportNamesDataSource: CustomStore;
  flightTypeSource: ArrayStore;
  flightSourcesSource: ArrayStore;
  flightTypes = [
    { value: null, label: null },
    { value: 0, label: 'Arrival' },
    { value: 1, label: 'Departure' },
    // ...
  ];
  flightSources = [
    { value: null, label: null },
    { value: 0, label: 'Native' },
    { value: 1, label: 'Foreigner' },
  ];
  flightNumber = {
   
    arrivalTime: '',
    departureTime: '',
    arrivalAirportId:'',
    departureAirportId: '',
    flightName: '',
    flightDate: '',
    flightTimeOnly: {
      hour: 0,
      minute: 0,
    },
    airlineName: '',
    status: false,
    scheduled: false,
    flightType: 0,
    flightSources: 0,
  };

  flightForm = new FormGroup({
    arrivalTime: new FormControl('', Validators.required),
      departureTime: new FormControl('', Validators.required),
    flightName: new FormControl('', Validators.required),
    flightDate: new FormControl(''),

    airlineName: new FormControl('', Validators.required),
    status: new FormControl(false, Validators.required),
    scheduled: new FormControl(false, Validators.required),
    flightType: new FormControl(0, Validators.required),
    flightSources: new FormControl(0, Validators.required),
    arrivalAirportId:new FormControl('',Validators.required),
    departureAirportId: new FormControl('',Validators.required),
  });
  editmode: boolean = false;
  flightId: any;
  submitted=false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private _location: Location,
    private route: ActivatedRoute,
    private service: FlightService
  ) {
    this.flightTypeSource = new ArrayStore({
      key: 'value',
      data: this.flightTypes,
      // Other ArrayStore properties go here
    });
    this.flightSourcesSource = new ArrayStore({
      key: 'value',
      data: this.flightSources,
      // Other ArrayStore properties go here
    });
    this.route.params.subscribe((params: any) => {
      if (params.flightId) {
        this.flightId = params.flightId;
        this.editmode = true;
      }
    });


   

  }
 

  ngOnInit(): void {
    this.loadList(this.http);
    if (this.editmode) {
      this.initForm();
    }
  }
  initForm() {
    this.http
      .get<any>(`${environment.flightAddress}/FlightNumber/${this.flightId}`)
      .subscribe((data: any) => { console.log("====>",data);
      
        this.flightForm = new FormGroup({
          arrivalTime: new FormControl(data.arrivalTime,Validators.required),
          departureTime: new FormControl( data.departureTime, Validators.required ),
          flightName: new FormControl(data.flightName, Validators.required),
          flightDate: new FormControl(data.flightDate),
          airlineName: new FormControl(data.airlineName, Validators.required),
          status: new FormControl(data.status, Validators.required),
          scheduled: new FormControl(data.scheduled, Validators.required),
          flightType: new FormControl(data.flightType, Validators.required),
          flightSources: new FormControl( data.flightSource, Validators.required ),
          arrivalAirportId:new FormControl(data.arrivalAirportId,Validators.required),
          departureAirportId: new FormControl(data.departureAirportId,Validators.required),
        });
      });
  }
  onSubmit() {


    this.submitted=true;
if(!this.flightForm.valid){return;}
if(this.flightForm.value.arrivalAirportId===this.flightForm.value.departureAirportId){
return;
}


    if (this.editmode) {
      this.http
        .put<any>(
          `${environment.flightAddress}/FlightNumber/${this.flightId}`,
          {
            id: this.flightId,
            arrivalTime: this.flightForm.value.arrivalTime,
            departureTime: this.flightForm.value.departureTime,
            flightName: this.flightForm.value.flightName,
            flightDate: this.flightForm.value.flightDate,
            airlineName: this.flightForm.value.airlineName,
            status: this.flightForm.value.status,
            scheduled: this.flightForm.value.scheduled,
            flightType: this.flightForm.value.flightType,
            flightSource: this.flightForm.value.flightSources,
            arrivalAirportId:this.flightForm.value.arrivalAirportId,
            departureAirportId: this.flightForm.value.departureAirportId,
          }
        )
        .subscribe((data) => {
          this.oncancel();
        });
    } else {
      this.http
        .post<any>(`${environment.flightAddress}/FlightNumber`, {
          id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          arrivalTime: this.flightForm.value.arrivalTime,
          departureTime: this.flightForm.value.departureTime,
          flightName: this.flightForm.value.flightName,
          flightDate: this.flightForm.value.flightDate,
          airlineName: this.flightForm.value.airlineName,
          status: this.flightForm.value.status,
          scheduled: this.flightForm.value.scheduled,
          flightType: this.flightForm.value.flightType,
          flightSource: this.flightForm.value.flightSources,
          arrivalAirportId:this.flightForm.value.arrivalAirportId,
          departureAirportId: this.flightForm.value.departureAirportId,
        })
        .subscribe((data) => {
          this.oncancel();
        });
    }
  }
  loadList(http: HttpClient) {
    this.airLineNamesDataSource = new CustomStore({
      key: 'id',
      byKey(key) {
        return http
          .get<any>(
            `${environment.flightAddress}/AirlineName?skip=0&take=200&requireTotalCount=true&filter=[["name","=","${key}"]]`
          )
          .pipe(
            map((data) => {
              return data.data[0];
            })
          )
          .toPromise();
      },
      load(loadOptions: any) {
        var filter = `skip=0&take=200&requireTotalCount=true`;
        if (loadOptions.searchValue) {
          filter =
            filter +
            `&filter=[["name","contains","${loadOptions.searchValue}"]]`;
        }

        return lastValueFrom(
          http.get(`${environment.flightAddress}/AirlineName?${filter}`)
        )
          .then((data: any) => ({
            data: data.data,
            totalCount: data.totalCount,
            summary: data.summary,
            groupCount: data.groupCount,
          }))
          .catch((error) => {
            throw 'Data Loading Error';
          });
      },
    });


    this.airportNamesDataSource = new CustomStore({
      key: 'id',
      byKey(key) {
        return http
          .get<any>(
            `${environment.flightAddress}/Airport?skip=0&take=200&requireTotalCount=true&filter=[["id","=","${key}"]]`
          )
          .pipe(
            map((data) => {
              return data.data[0];
            })
          )
          .toPromise();
      },
      load(loadOptions: any) {
        var filter = `skip=0&take=200&requireTotalCount=true`;
        if (loadOptions.searchValue) {
          filter =
            filter +
            `&filter=[["name","contains","${loadOptions.searchValue}"]]`;
        }

        return lastValueFrom(
          http.get(`${environment.flightAddress}/Airport?${filter}`)
        )
          .then((data: any) => ({
            data: data.data,
            totalCount: data.totalCount,
            summary: data.summary,
            groupCount: data.groupCount,
          }))
          .catch((error) => {
            throw 'Data Loading Error';
          });
      },
    });
  }
  oncancel() {
    this.service.setRefreshObs('');
    this.router.navigate(['/dashboard/basicdata/flights']);
  }
}
