import { NgFor } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import ArrayStore from 'devextreme/data/array_store';
import { Observable } from 'rxjs';
import * as fromStore from '../../../store';
import * as fromAction from '../../../store/reserve.action';
import { ReserveItem, Visa } from '../../models/reserve.model';
import * as uuid from 'uuid';
@Component({
  selector: 'app-passenger-from',
  templateUrl: './passenger-from.component.html',
  styleUrls: ['./passenger-from.component.css'],
})
export class PassengerFromComponent implements OnInit {
  max = new Date();
  @ViewChild('f') form: NgForm;
  submitted = false;

  serviceListSource: ArrayStore;
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
  constructor(private store: Store<fromStore.ReserveModuleState>) {
    this.store$ = store.select<any>('reserve');
    this.genderSource = new ArrayStore({
      key: 'value',
      data: this.genderTypes,
    });
  }

  ngOnInit(): void {
    this.store$.subscribe((sub) => {
      this.currentState = sub.reserve;
      if (sub.reserve && sub.reserve.ServiceLine) {
        this.serviceList = sub.reserve.ServiceLine.filter((data: any) => {
          return data.serviceTypeId === 1;
        });
        this.serviceListVisa = sub.reserve.ServiceLine.filter((data: any) => {
          return data.serviceTypeId === 5;
        });
        this.serviceListWheelchair = sub.reserve.ServiceLine.filter(
          (data: any) => {
            return data.serviceTypeId === 8;
          }
        );

        this.passengers = sub.reserve.ReserveItem;
        this.serviceListSource = new ArrayStore({
          key: 'id',
          data: this.serviceList,
        });
      }
    });
  }
  editPassenger(id: any) {
    this.editMode = true;
    this.id = id.row.key;
    let selectedItem: ReserveItem = this.passengers.filter((p: any) => {
      return (
        p.passenger && (p.passenger.id === id.row.key || p.id === id.row.key)
      );
    })[0];

    this.form.form.controls['passengerType'].setValue(
      selectedItem.serviceLineId
    );
    setTimeout(() => {
      this.form.form.controls['name'].setValue(selectedItem.passenger?.name);
      this.form.form.controls['lastName'].setValue(
        selectedItem.passenger?.lastName
      );
      this.form.form.controls['gender'].setValue(
        selectedItem.passenger?.gender
      );
      if (this.form.form.controls['nationalCode']) {
        this.form.form.controls['nationalCode'].setValue(
          selectedItem.passenger?.nationalCode
        );
      }
      if (this.form.form.controls['passportNumber']) {
        this.form.form.controls['passportNumber'].setValue(
          selectedItem.passenger?.passportNumber
        );
      }

      this.form.form.controls['birthDate'].setValue(
        selectedItem.passenger?.birthDate
      );
      this.form.form.controls['visa'].setValue(selectedItem.passenger?.visa);
      this.form.form.controls['wheelchair'].setValue(
        selectedItem.passenger?.wheelchair
      );
    }, 200);
  }
  setSelectedPassengerType($event: any) {
    this.selectedPassengerType = $event.selectedItem;
    if ($event.selectedItem && $event.selectedItem.serviceLineScheme) {
      this.schema = JSON.parse(
        $event.selectedItem.serviceLineScheme.replaceAll("'", '"')
      );
    }
  }
  namePattern = true;
  lastNamePattern = true;

  onSubmit(f: NgForm) {
    console.log(f.form);

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
      serviceAdvanceTotal: this.selectedPassengerType.serviceLinePrices[0].price,
      serviceStatus: 1,
      lom: null,
      visa: null,
      transfer: null,
      attendee: null,
      wheelchair: null,
      suite: null,
      meetingRoom: null,
      pet: null
    };
    if (this.editMode) {
      this.store.dispatch(
        fromAction.UpdateReserveItem({ Id: newId, ReserveItem: item })
      );
    } else {
      this.store.dispatch(fromAction.SaveReserveItem({ ReserveItem: item }));
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
    this.store.dispatch(
      fromAction.SaveState({
        state: this.currentState,
      })
    );
    f.form.reset();
  }
  closeForm() {
    this.form.reset();
  }

  addVisaToList(passenger: ReserveItem) {
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
      pet: null
    };
    this.store.dispatch(
      fromAction.UpdateVisaReserveItem({ ReserveItem: item })
    );
  }

  removeVisaFromList(item: ReserveItem) {
    var i = this.passengers.find((data: any) => {
      return data.visa && data.visa.relatedPassengerId === item.id;
    });

    if (i) {
      this.store.dispatch(
        fromAction.DeleteReserveItem({ Id: i.id ? i.id : '' })
      );
    }
  }

  addWheelchairToList(passenger: ReserveItem) {
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
      serviceAdvanceTotal: this.serviceListWheelchair[0].serviceLinePrices[0].price,
      serviceStatus: 1,
      lom: null,
      passenger: null,
      visa: null,
      transfer: null,
      attendee: null,
      suite: null,
      meetingRoom: null,
      pet: null
    };
    this.store.dispatch(
      fromAction.UpdateWheelchairReserveItem({ ReserveItem: item })
    );
  }

  removeWheelchairFromList(item: ReserveItem) {
    var i = this.passengers.find((data: any) => {
      return data.wheelchair && data.wheelchair.relatedPassengerId === item.id;
    });

    if (i) {
      this.store.dispatch(
        fromAction.DeleteReserveItem({ Id: i.id ? i.id : '' })
      );
    }
  }
}
