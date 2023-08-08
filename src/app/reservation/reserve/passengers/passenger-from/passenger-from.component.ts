import { NgFor } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import ArrayStore from 'devextreme/data/array_store';
import { Observable } from 'rxjs';
import * as fromStore from '../../../store';
import * as fromAction from '../../../store/reserve.action';
import { ReserveItem } from '../../models/ReserveItem';
import { Visa } from '../../models/Visa';
import * as uuid from 'uuid';
import { Lom } from '../../models/Lom';
@Component({
  selector: 'app-passenger-from',
  templateUrl: './passenger-from.component.html',
  styleUrls: ['./passenger-from.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PassengerFromComponent implements OnInit, OnChanges {
  @Input() type: string;
  @Input() locationId: string;
  @Input() passenger: any;
  max = new Date();
  @ViewChild('f') form: NgForm;
  submitted = false;

  passengerTypes: ArrayStore;
  selectedPassengerType: any;
  genderSource: ArrayStore;
  genderTypes = [
    { value: '0', label: 'خانم' },
    { value: '1', label: 'آقا' },
  ];
  passengers: ReserveItem[];
  store$: Observable<any>;
  serviceList: any;
  schema: any;
  currentState: any;
  editMode: boolean = false;
  id: string;
  serviceListVisa: any;
  serviceListWheelchair: any;
  serviceListLOM: any;
  visa: boolean | undefined;
  wheelchair: boolean | undefined;
  lom: boolean | undefined;
  visa1: boolean | undefined;
  wheelchair1: boolean | undefined;
  lom1: boolean | undefined;
  tripId: any;
  reserveRecordId: any;

  constructor(private store: Store<fromStore.ReserveModuleState>) {
    this.store$ = store.select<any>('reserve');
    this.genderSource = new ArrayStore({
      key: 'value',
      data: this.genderTypes,
    });
  }
  ngOnChanges(changes: SimpleChanges): void {}

  ngOnInit(): void {
    this.store$.subscribe((sub) => {
      this.tripId = sub.reserve.trip.id;

      var items = sub.reserve.trip.reserveRecords.find((data: any) => {
        return data.locationId === this.locationId;
      });

      this.reserveRecordId = items.id;

      this.currentState = sub.reserve;
      if (
        this.type === 'Departure' &&
        sub.reserve &&
        sub.reserve.departureServiceLine
      ) {
        this.serviceList = sub.reserve.departureServiceLine.filter(
          (data: any) => {
            return data.serviceTypeId === 1;
          }
        );
        this.serviceListVisa = sub.reserve.departureServiceLine.filter(
          (data: any) => {
            return data.serviceTypeId === 5;
          }
        );
        this.serviceListWheelchair = sub.reserve.departureServiceLine.filter(
          (data: any) => {
            return data.serviceTypeId === 8;
          }
        );
        this.serviceListLOM = sub.reserve.departureServiceLine.filter(
          (data: any) => {
            return data.serviceTypeId === 9;
          }
        );

        if (items) {
          this.passengers = items.reserveItems;
        }
        this.passengerTypes = new ArrayStore({
          key: 'id',
          data: this.serviceList,
        });
      }
      if (
        this.type === 'Arrival' &&
        sub.reserve &&
        sub.reserve.arrivalServiceLine
      ) {
        this.serviceList = sub.reserve.arrivalServiceLine.filter(
          (data: any) => {
            return data.serviceTypeId === 1;
          }
        );
        this.serviceListVisa = sub.reserve.arrivalServiceLine.filter(
          (data: any) => {
            return data.serviceTypeId === 5;
          }
        );
        this.serviceListWheelchair = sub.reserve.arrivalServiceLine.filter(
          (data: any) => {
            return data.serviceTypeId === 8;
          }
        );
        this.serviceListLOM = sub.reserve.arrivalServiceLine.filter(
          (data: any) => {
            return data.serviceTypeId === 9;
          }
        );
        if (items) {
          this.passengers = items.reserveItems;
        }
        this.passengerTypes = new ArrayStore({
          key: 'id',
          data: this.serviceList,
        });
      }

      if (this.submitted) {
        this.submitted = false;
        this.store.dispatch(
          fromAction.SaveState({
            state: this.currentState,
          })
        );
      }
    });
  }
  editPassenger(id: any) {
    this.passenger = id.row.data;

    this.editMode = true;
    this.id = id.row.key;
    let selectedItem: ReserveItem = this.passengers.filter((p: any) => {
      return (
        p.passenger && (p.passenger.id === id.row.key || p.id === id.row.key)
      );
    })[0];
    console.log(selectedItem);
    try {
      this.form.form.controls['passengerType'].setValue(
        selectedItem.serviceLineId
      );
    } catch (error) {}
  }
  setSelectedPassengerType($event: any) {
    this.selectedPassengerType = $event.selectedItem;
    if ($event.selectedItem && $event.selectedItem.serviceLineScheme) {
      this.schema = JSON.parse(
        $event.selectedItem.serviceLineScheme.replaceAll("'", '"')
      );
    }

    setTimeout(() => {
      if (this.passenger) {
        this.form.form.controls['name'].setValue(this.passenger.name);
        this.form.form.controls['lastName'].setValue(this.passenger.lastName);
        this.form.form.controls['gender'].setValue(this.passenger.gender + '');
        if (this.form.form.controls['nationalCode']) {
          this.form.form.controls['nationalCode'].setValue(
            this.passenger.nationalCode
          );
        }
        if (this.form.form.controls['passportNumber']) {
          this.form.form.controls['passportNumber'].setValue(
            this.passenger.passportNumber
          );
        }
        if (this.form.form.controls['birthDate']) {
          this.form.form.controls['birthDate'].setValue(
            this.passenger.birthDate
          );
        }

        this.visa1 = this.passenger.visa;
        this.wheelchair1 = this.passenger.wheelchair;
        this.lom1 = this.passenger.lom;

        if (this.form.form.controls['visa'])
          this.form.form.controls['visa'].setValue(
            this.visa1 ? this.visa1 : false
          );
        if (this.form.form.controls['wheelchair'])
          this.form.form.controls['wheelchair'].setValue(
            this.wheelchair1 ? this.wheelchair1 : false
          );
        if (this.form.form.controls['lom'])
          this.form.form.controls['lom'].setValue(
            this.lom1 ? this.lom1 : false
          );
      }
    }, 300);
  }
  namePattern = true;
  lastNamePattern = true;

  onSubmit(f: NgForm) {

    this.submitted = true;
    if (!f.form.valid) {
      var nameError = f.form.controls['name'].errors;
      if (nameError && nameError!['pattern']) {
        this.namePattern = false;
      }
      var lastNameError = f.form.controls['lastName'].errors;
      if (lastNameError && lastNameError!['pattern']) {
        this.lastNamePattern = false;
      }
      return;
    }

    let newId = uuid.v4();

    let visa: Visa | undefined = undefined;
    if (f.form.value.visa) {
      visa = { relatedPassengerId: newId };
    }

    let wheelchair: Visa | undefined = undefined;

    if (f.form.value.wheelchair) {
      wheelchair = { relatedPassengerId: newId };
    }
    let lom: Lom | undefined = undefined;
    if (f.form.value.lom) {
      lom = { relatedPassengerId: newId };
    }

    if (this.editMode) {
      newId = this.id;
    }

    let item: ReserveItem = {
      id: newId,
      passenger: {
        id: newId,
        name: f.form.value.name ? f.form.value.name : '',
        lastName: f.form.value.lastName ? f.form.value.lastName : '',
        gender: f.form.value.gender,
        nationalCode: f.form.value.nationalCode,
        passportNumber: f.form.value.passportNumber
          ? f.form.value.passportNumber
          : '',
        passportExpireDate: f.form.value.passportExpireDate
          ? f.form.value.passportExpireDate
          : '',
        visa: f.form.value.visa,
        lom: f.form.value.lom,
        wheelchair: f.form.value.wheelchair,
        birthDate: f.form.value.birthDate,
        nationality: f.form.value.nationality ? f.form.value.nationality : 0,
      },

      serviceLineId: this.selectedPassengerType.id,
      serviceLineTitle: this.selectedPassengerType.title,
      unitPrice: this.selectedPassengerType.serviceLinePrices[0].price,
      serviceQty: 1,
      serviceTypeId: this.selectedPassengerType.serviceTypeId,
      serviceTotal: this.selectedPassengerType.serviceLinePrices[0].price,
      discountPercent: 0,
      discountValue: 0,
      serviceTotalAfterDiscount: 0,
      taxPercent: 0,
      taxValue: 0,
      serviceAdvanceTotal:
        this.selectedPassengerType.serviceLinePrices[0].price,
      serviceStatus: 1,
      lom: null,
      visa: null,
      wheelchair: null,
      transfer: null,
      attendee: null,
      suite: null,
      meetingRoom: null,
      pet: null,
    };

    if (this.editMode) {
      if (this.tripId) {
        this.store.dispatch(
          fromAction.UpdateBackendReserveItem({
            reserveRecordId: this.reserveRecordId,
            tripId: this.tripId,
            locationId: this.locationId,
            Id: newId,
            ReserveItem: item,
          })
        );
      } else {
        this.store.dispatch(
          fromAction.UpdateReserveItem({
            locationId: this.locationId,
            Id: newId,
            ReserveItem: item,
          })
        );
      }
    } else {
      if (this.tripId) {
        this.store.dispatch(
          fromAction.SaveBackendReserveItem({
            reserveRecordId: this.reserveRecordId,
            tripId: this.tripId,
            locationId: this.locationId,
            ReserveItem: item,
          })
        );
      } else {
        this.store.dispatch(
          fromAction.SaveReserveItem({
            locationId: this.locationId,
            ReserveItem: item,
          })
        );
      }
    }

    if (item.passenger?.visa) {





      this.addVisaToList(item);


    } else {
      this.removeVisaFromList(item);
    }
    if (item.passenger?.wheelchair) {
      this.addWheelchairToList(item);
    } else {
      this.removeWheelchairFromList(item);
    }
    if (item.passenger?.lom) {
      this.addLOMToList(item);
    } else {
      this.removeLOMFromList(item);
    }
    this.editMode = false;
    this.id = '';

    f.form.reset();
  }
  closeForm() {
    this.form.reset();
  }

  addVisaToList(passenger: ReserveItem) {
    var i = this.passengers.find((data: any) => {
      return data.visa && data.visa.relatedPassengerId === passenger.id;
    });

    if (!i) {
    let newId = uuid.v4();
    let item: ReserveItem = {
      id: newId,
      visa: {
        relatedPassengerId: passenger.id ? passenger.id : '',
      },

      serviceLineId: this.serviceListVisa[0].id,
      serviceLineTitle: this.serviceListVisa[0].title,
      unitPrice: this.serviceListVisa[0].serviceLinePrices[0].price,
      serviceQty: 1,
      serviceTypeId: this.serviceListVisa[0].serviceTypeId,
      serviceTotal: this.serviceListVisa[0].serviceLinePrices[0].price,
      discountPercent: 0,
      discountValue: 0,
      serviceTotalAfterDiscount: 0,
      taxPercent: 0,
      taxValue: 0,
      serviceAdvanceTotal: this.serviceListVisa[0].serviceLinePrices[0].price,
      serviceStatus: 1,
      lom: null,
      passenger: null,
      transfer: null,
      attendee: null,
      wheelchair: null,
      suite: null,
      meetingRoom: null,
      pet: null,
    };
    this.store.dispatch(
      fromAction.UpdateReserveItem({
        locationId: this.locationId,
        Id: newId,
        ReserveItem: item,
      })
    );
    }
  }

  removeVisaFromList(item: ReserveItem) {
    if (this.passengers) {
      var i = this.passengers.find((data: any) => {
        return data.visa && data.visa.relatedPassengerId === item.id;
      });

      if (i) {
        // this.store.dispatch(
        //   fromAction.DeleteReserveItem({
        //     locationId: this.locationId,
        //     Id: i.id ? i.id : '',
        //   })
        // );

        this.store.dispatch(  fromAction.DeleteReserveItem({
          Id: i.id ? i.id : '',
          locationId: this.locationId,
        }));
      }
    }
  }

  addWheelchairToList(passenger: ReserveItem) {
    
      var i = this.passengers.find((data: any) => {
        return (
          data.wheelchair && data.wheelchair.relatedPassengerId === passenger.id
        );
      });

      if (!i) {
    let newId = uuid.v4();
    let item: ReserveItem = {
      id: newId,
      wheelchair: {
        relatedPassengerId: passenger.id ? passenger.id : '',
      },

      serviceLineId: this.serviceListWheelchair[0].id,
      serviceLineTitle: this.serviceListWheelchair[0].title,
      unitPrice: this.serviceListWheelchair[0].serviceLinePrices[0].price,
      serviceQty: 1,
      serviceTypeId: this.serviceListWheelchair[0].serviceTypeId,
      serviceTotal: this.serviceListWheelchair[0].serviceLinePrices[0].price,
      discountPercent: 0,
      discountValue: 0,
      serviceTotalAfterDiscount: 0,
      taxPercent: 0,
      taxValue: 0,
      serviceAdvanceTotal:
        this.serviceListWheelchair[0].serviceLinePrices[0].price,
      serviceStatus: 1,
      lom: null,
      passenger: null,
      visa: null,
      transfer: null,
      attendee: null,
      suite: null,
      meetingRoom: null,
      pet: null,
    };

    this.store.dispatch(
      fromAction.UpdateReserveItem({
        locationId: this.locationId,
        Id: newId,
        ReserveItem: item,
      })
    );
      }
  }

  removeWheelchairFromList(item: ReserveItem) {
    if (this.passengers) {
      var i = this.passengers.find((data: any) => {
        return (
          data.wheelchair && data.wheelchair.relatedPassengerId === item.id
        );
      });
      if (i) {
        this.store.dispatch(
          fromAction.DeleteReserveItem({
            Id: i.id ? i.id : '',
            locationId: this.locationId,
          })
        );
      }
    }
  }

  addLOMToList(passenger: ReserveItem) {
    var i = this.passengers.find((data: any) => {
      return data.lom && data.lom.relatedPassengerId === passenger.id;
    });
   

    if (!i) {
    let newId = uuid.v4();
    let item: ReserveItem = {
      id: newId,
      wheelchair: null,

      serviceLineId: this.serviceListLOM[0].id,
      serviceLineTitle: this.serviceListLOM[0].title,
      unitPrice: this.serviceListLOM[0].serviceLinePrices[0].price,
      serviceQty: 1,
      serviceTypeId: this.serviceListLOM[0].serviceTypeId,
      serviceTotal: this.serviceListLOM[0].serviceLinePrices[0].price,
      discountPercent: 0,
      discountValue: 0,
      serviceTotalAfterDiscount: 0,
      taxPercent: 0,
      taxValue: 0,
      serviceAdvanceTotal: this.serviceListLOM[0].serviceLinePrices[0].price,
      serviceStatus: 1,
      lom: {
        relatedPassengerId: passenger.id ? passenger.id : '',
      },
      passenger: null,
      visa: null,
      transfer: null,
      attendee: null,
      suite: null,
      meetingRoom: null,
      pet: null,
    };

    this.store.dispatch(
      fromAction.UpdateReserveItem({
        Id: newId,
        locationId: this.locationId,
        ReserveItem: item,
      })
    );
    }
  }

  removeLOMFromList(item: ReserveItem) {
    if (this.passengers) {
      var i = this.passengers.find((data: any) => {
        return data.lom && data.lom.relatedPassengerId === item.id;
      });
     

      if (i) {
        this.store.dispatch(
          fromAction.DeleteReserveItem({
            Id: i.id ? i.id : '',
            locationId: this.locationId,
          })
        );
      }
    }
  }
}
