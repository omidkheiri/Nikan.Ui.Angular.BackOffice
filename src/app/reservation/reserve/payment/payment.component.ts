import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { PaymentService } from './payment.service';
import { Trip } from '../models/Trip';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  navtoReserve(arg0: any) {
    window.location.href = '/dashboard/reserve/Reserve/' + arg0;
  }

  reserveItemStatus = [
    { id: 0, title: 'Pending' },
    { id: 1, title: 'Consumed' },
    { id: 2, title: 'Expired' },
    { id: 3, title: 'Canceled' },
  ];

  trip: Trip | any;
  id: any;
  account: any;
  tripValue: any;
  Locations: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: PaymentService,
    private http: HttpClient
  ) {
    this.route.params.subscribe((params: any) => {
      this.id = params.tripId;
    });

    this.http
      .get(
        `${environment.serviceLocationAddress}/ServiceLocation?accountId=&SearchTerm=&PageNumber=1&PageSize=500&OrderBy=Title`
      )
      .subscribe((data1: any) => {
        this.Locations = data1;
      });
  }
  getLocationTitle(e: any): string {
    var item = this.Locations.find((data: any) => {
      return data.id === e;
    });
    if (!item) {
      return 'محل ارائه سرویس موحود نیست';
    }
    return item.title;
  }
  AddPayment() {
    this.tripValue = this.trip;
    this.visible = !this.visible;

    this.router.navigate([
      `/dashboard/reserve/Payment/${this.trip.id}/addPayment`,
    ]);
  }
  PayFromAccount() {
    this.service.getReservePayment(this.id).subscribe((data: any) => {
      this.service.getReserve(this.id).subscribe((data: any) => {
        this.trip = data;
        this.service.getAccount(data.contactId).subscribe((data: any) => {
          this.account = data;
        });
      });
    });
  }
  visible = false;
  ngOnInit(): void {
    this.service.getReserve(this.id).subscribe((data: any) => {
      this.trip = data;

      this.service.getAccount(data.contactId).subscribe((data: any) => {
        this.account = data;
      });
    });
  }
  receivePayment(e: any) {
    this.visible = false;
    this.service.getReserve(this.id).subscribe((data: any) => {
      this.trip = data;
      this.service.getAccount(data.contactId).subscribe((data: any) => {
        this.account = data;
      });
    });
  }
  navtoPrint(tripId: any, e: any) {
    this.router.navigate([`/dashboard/reserve/Payment/${tripId}/print/${e}`]);
  }
  navToComplete(tripId: any, e: any) {
    var reserveRecode = this.trip.reserveRecords.find((d: any) => {
      return d.id === e;
    });

    if (reserveRecode && reserveRecode.reserveStatus != 3) {
      Swal.fire({ text: 'ثبت کد رزرو تنها در حالت پرداخت شده ممکن است' });
    } else {
      this.router.navigate([
        `/dashboard/reserve/Payment/${tripId}/complete/${e}`,
      ]);
    }
  }

  navToCancel(tripId: any, recordId: any) {
    this.service.CancelReserve(tripId, recordId).subscribe((data: any) => {
      this.service.getReserve(this.id).subscribe((data: any) => {
        this.trip = data;
        this.service.getAccount(data.contactId).subscribe((data: any) => {
          this.account = data;
        });
      });
    });
  }
  getStyle(item: any) {
    switch (item) {
      case 0:
        return 'badge badge-success';
        break;
      case 1:
        return 'badge badge-success';
        break;
      case 2:
        return 'badge badge-warning';
        break;
      case 3:
        return 'badge badge-info';
        break;
      case 4:
        return 'badge badge-success';
        break;
      case 5:
        return 'badge badge-danger';
        break;

      case 6:
        return 'badge badge-danger';
        break;
      default:
        break;
    }
    return '';
  }

  getItemStyle(item: any) {
    switch (item) {
      case 0:
        return 'badge badge-warning';
        break;
      case 1:
        return 'badge badge-success';
        break;
      case 2:
        return 'badge badge-danger';
        break;
      case 3:
        return 'badge badge-danger';
        break;
      default:
        break;
    }
    return '';
  }
  getItemStatus(item: any) {
    switch (item) {
      case 0:
        return 'Pendding';
        break;
      case 1:
        return 'Consumed';
        break;
      case 2:
        return 'Expiered';
        break;
      case 3:
        return 'Canceled';
        break;
      default:
        break;
    }
    return '';
  }

  getReserveStatus(e: any) {
    switch (e) {
      case 0:
        return 'Draft';
        break;
      case 1:
        return 'Submitted';
        break;
      case 2:
        return 'Pay Waiting';
        break;
      case 3:
        return 'Paid';
        break;
      case 4:
        return 'Sent';
        break;
      case 5:
        return 'Cancelled';
      case 6:
        return 'ChangeAfterSubmit';
        break;
      default:
        break;
    }
    return '';
  }

  async Edit(edit: any, reserveRecord: any) {
    if (reserveRecord.reserveStatus == 1 || reserveRecord.reserveStatus == 6) {
      if (edit.oldData.serviceStatus != 3 && edit.newData.serviceStatus == 3) {
        await Swal.fire({
          title: 'پنالتی',
          input: 'number',
          inputLabel: 'مبلغ پنالتی را وارد کنید',
          inputPlaceholder: 'مبلغ پنالتی',
          inputValidator: (value) => {
            return !value ? 'مبلغ لازم است' : '';
          },
        }).then((data: any) => {
          console.log('****************', edit, reserveRecord, data.value);

          this.service
            .cancelReserveItem(
              this.trip.id,
              reserveRecord.id,
              edit.oldData.id,
              { Penalty: data.value }
            )
            .subscribe((data: any) => {
              this.service.getReserve(this.id).subscribe((data: any) => {
                this.trip = data;
                this.service
                  .getAccount(data.contactId)
                  .subscribe((data: any) => {
                    this.account = data;
                  });
              });
            });
        });
      }
    }
  }
}
