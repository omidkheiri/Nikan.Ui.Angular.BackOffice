import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map, Subscription, tap } from 'rxjs';
import { ReserveService } from 'src/app/reservation/service/reserve.service';
import { environment } from 'src/environments/environment';
import { PaymentService } from '../payment.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.css'],
})
export class AddPaymentComponent implements OnInit {
  Date = new Date();

  @Output() paymentEvent = new EventEmitter<string>();
  submitted: boolean = false;
  saved: boolean;
  Locations: any;
  tripId: string;
  trip: any;
  constructor(
    private service: ReserveService,
    private http: HttpClient,
    private paymentService: PaymentService,
    private router: Router
  ) {
    var id = router.url.split('/');

    this.tripId = id[4];
  }
  ngOnDestroy(): void {}

  ngOnInit(): void {
    this.paymentService.getReserve(this.tripId).subscribe((data: any) => {
      console.log(data);
      
      this.trip = data;
    });
  }

  onSubmit(form: NgForm) {
    console.log(form);
    this.submitted = true;
    if (!form.valid) {
      return;
    }
    try {
      this.service
        .addPayment(this.trip.contactId, {
          bankTitle: form.value.BankTitle,
          bankaccountId: form.value.BankaccountId,
          traceNumber: form.value.TraceNumber,
          referenceId: form.value.ReferenceId,
          tripCode: this.trip.tripCode,
          amount: form.value.Amount,
          dateIssue: form.value.DateIssue,
          contactId: this.trip.contactId,
          tripId: this.trip.id,
        })
        .subscribe((a: any) => {
        //  this.router.navigate(['/dashboard/reserve/Payment/' + this.tripId]);


window.location.href = '/dashboard/reserve/Payment/' + this.tripId;

        });
    } catch (err: any) {
      Swal.fire({ text: JSON.stringify(err) });
    }
  }
  goBack() {
    this.router.navigate(['/dashboard/reserve/Payment/' + this.tripId]);
  }
}
