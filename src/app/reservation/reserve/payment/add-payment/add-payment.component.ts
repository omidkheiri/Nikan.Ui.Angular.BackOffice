import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map, Subscription, tap } from 'rxjs';
import { ReserveService } from 'src/app/reservation/service/reserve.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.css'],
})
export class AddPaymentComponent implements OnInit {
  Date = new Date();
  @Input('trip') trip: any;
  @Output() paymentEvent = new EventEmitter<string>();
  submited: boolean = false;
  saved: boolean;
  Locations: any;
  constructor(private service: ReserveService,private http:HttpClient) {}
  ngOnDestroy(): void {}

  ngOnInit(): void {
    console.log(this.trip);


  }

  onSubmit(form: NgForm) {
    console.log(form);
    this.submited = true;
    if (!form.valid) {
      return;
    }
    try {
      this.service
        .addPayment(this.trip.contactId, {
          bankTitle: form.value.BankTitle,
          bankAccountId: form.value.BankAccountId,
          traceNumber: form.value.TraceNumber,
          referenceId: form.value.ReferenceId,
          tripCode: this.trip.tripCode,
          amount: form.value.Amount,
          dateIssue: form.value.DateIssue,
          contactId: this.trip.contactId,
          tripId: this.trip.id,
        })
        .subscribe((a: any) => {
          this.saved = true;

          this.paymentEvent.emit('a');
        });
    } catch (err: any) {
      console.log(err);
    }
  }
}
