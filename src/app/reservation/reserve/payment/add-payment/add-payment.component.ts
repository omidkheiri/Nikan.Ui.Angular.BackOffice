import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.css'],
})
export class AddPaymentComponent implements OnInit {
  @Input('reserveRecord') reserveRecord: any;
  @Output() paymentEvent = new EventEmitter<string>();
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnDestroy(): void {}

  ngOnInit(): void {
    console.log(this.reserveRecord);
  }

  onSubmit(form: NgForm) {
    console.log(form);

    if (!form.valid) {
      return;
    }

    this.httpClient
      .post(
        `${environment.FinancialAddress}/BankPayment/${this.reserveRecord.contactId}`,
        {
          bankTitle: form.value.BankTitle,
          bankAccountId: form.value.BankAccountId,
          traceNumber: form.value.TraceNumber,
          refrenceId: form.value.RefrenceId,
          reserveNumber: this.reserveRecord.reserveNumber,
          amount: form.value.Amount,
          dateIssue: form.value.DateIssue,
          contactId: this.reserveRecord.contactId,
          reserveId: this.reserveRecord.id,
        }
      )

      .subscribe(
        (a: any) => {
          this.paymentEvent.emit(a);
        },

        (error) => {
          console.log(error);

          this.paymentEvent.emit('asdasd');
        }
      );
  }
}
