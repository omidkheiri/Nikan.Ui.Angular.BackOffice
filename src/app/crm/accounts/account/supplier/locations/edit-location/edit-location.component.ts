import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { lastValueFrom, map, Observable, subscribeOn } from 'rxjs';
import { LocationItem } from 'src/app/crm/model/location.model';
import { Location } from '@angular/common';
import * as fromAction from 'src/app/crm/store/location/location.action';
import * as fromStore from '../../../../../store';
import { environment } from 'src/environments/environment';
import { HttpBackend, HttpClient } from '@angular/common/http';
import CustomStore from 'devextreme/data/custom_store';
@Component({
  selector: 'app-edit-location',
  templateUrl: './edit-location.component.html',
  styleUrls: ['./edit-location.component.css'],
})
export class EditLocationComponent implements OnInit, OnDestroy {
  id: string | any;
  currentLocation: any;
  editMode = false;
  accountId: string = '';
  popupVisible = false;

  emailButtonOptions: any;

  closeButtonOptions: any;

  positionOf = 'center';

  locationForm = new FormGroup({
    title: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
    maxAcceptDate: new FormControl(
      new Date().toISOString().slice(0, -1),
      Validators.required
    ),
    status: new FormControl(false, Validators.required),
    id: new FormControl(''),
    arrivalBufferTime: new FormControl(0, Validators.required),
    departureBufferTime: new FormControl(0, Validators.required),
    transferBufferTime: new FormControl(0, Validators.required),
    doNotShowInReserveLocationList:new FormControl(0),
    airportId:new FormControl('',null)

  });
  submitted: boolean;
  airportNamesDataSource: CustomStore<any, any>;

  constructor(private http:HttpClient,
    private route: ActivatedRoute,
    private store: Store<fromStore.CrmModuleState>,
    private _location: Location
  ) {
    store.select<any>('CRM').subscribe((data: any) => {
      this.accountId = data.account.account.id;
    });
    route.params.subscribe((params: Params) => {
      this.id = params['locationId'];
      this.editMode = params['locationId'] != null;
      this.store.dispatch(
        fromAction.loadingCurrentLocation({ payload: this.id })
      );
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
  ngOnDestroy(): void {
    this.store.dispatch(fromAction.loadLocations({ payload: this.accountId }));
    this.locationForm = new FormGroup({
      title: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required),
      maxAcceptDate: new FormControl(
        new Date().toISOString().slice(0, -1),
        Validators.required
      ),
      status: new FormControl(false, Validators.required),
      id: new FormControl(''),
      arrivalBufferTime: new FormControl(0, Validators.required),
      departureBufferTime: new FormControl(0, Validators.required),
      transferBufferTime: new FormControl(0, Validators.required),
      doNotShowInReserveLocationList:new FormControl(0),
      airportId:new FormControl('',null)
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['locationId'];
      this.editMode = params['locationId'] != null;
      this.initForm();
    });
  }
  SubmitFrom() {
    this.submitted=true
    if (!this.locationForm.valid) {
      return;
    }
    var obj = JSON.stringify(this.locationForm.getRawValue());
    var j = JSON.parse(obj);
    j['account'] = { id: this.accountId, title: '' };
    if (this.editMode) {
      this.store.dispatch(fromAction.updateCurrentLocation({ payload: j }));
    } else {
      this.store.dispatch(fromAction.saveCurrentLocation({ payload: j }));
    }
    this.oncancel();
  }

  private initForm() {
    if (this.editMode) {
      this.store
        .select<any>('CRM')
        .pipe(map((location) => location))
        .subscribe((loc) => {
          let location = loc.location.currentlocation;
          this.locationForm = new FormGroup({
            title: new FormControl(location.title, Validators.required),
            address: new FormControl(location.address, Validators.required),
            location: new FormControl(location.location, Validators.required),
            maxAcceptDate: new FormControl(
              location.maxAcceptDate,
              Validators.required
            ),
            status: new FormControl(location.status, Validators.required),
            id: new FormControl(this.id),
            arrivalBufferTime: new FormControl(location.arrivalBufferTime, [
              Validators.required,
              Validators.min(0),
            ]),
            departureBufferTime: new FormControl(
              location.departureBufferTime,
              Validators.required
            ),
            transferBufferTime: new FormControl(
              location.transferBufferTime,
              Validators.required
            ),doNotShowInReserveLocationList:new FormControl(  location.doNotShowInReserveLocationList),
            airportId:new FormControl(location.airportId,null)
          });
        });
    }
  }
  oncancel() {
  
    this._location.back();
    this.store.dispatch(fromAction.loadLocations({ payload: this.accountId }));
  }
}
