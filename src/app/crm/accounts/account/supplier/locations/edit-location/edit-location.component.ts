import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable, subscribeOn } from 'rxjs';
import { LocationItem } from 'src/app/crm/model/location.model';
import { Location } from '@angular/common';
import * as fromAction from 'src/app/crm/store/location/location.action';
import * as fromStore from '../../../../../store';
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
  });

  constructor(
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
            ),
          });
        });
    }
  }
  oncancel() {
    this.store.dispatch(fromAction.loadLocations({ payload: this.accountId }));
    this._location.back();
  }
}
