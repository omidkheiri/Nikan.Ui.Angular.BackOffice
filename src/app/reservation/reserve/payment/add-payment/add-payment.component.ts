import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  @Input('reserveRecord') reserveRecord: any;
  @Output() paymentEvent = new EventEmitter<string>();
  submited: boolean = false;
  saved: boolean;
  constructor(private service: ReserveService) {}
  ngOnDestroy(): void {}

  ngOnInit(): void {
    console.log(this.reserveRecord);
  }

  onSubmit(form: NgForm) {
    console.log(form);
    this.submited = true;
    if (!form.valid) {
      return;
    }
    try {
      this.service
        .addPayment(this.reserveRecord.contactId, {
          bankTitle: form.value.BankTitle,
          bankAccountId: form.value.BankAccountId,
          traceNumber: form.value.TraceNumber,
          refrenceId: form.value.RefrenceId,
          reserveNumber: this.reserveRecord.reserveNumber,
          amount: form.value.Amount,
          dateIssue: form.value.DateIssue,
          contactId: this.reserveRecord.contactId,
          reserveId: this.reserveRecord.id,
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
