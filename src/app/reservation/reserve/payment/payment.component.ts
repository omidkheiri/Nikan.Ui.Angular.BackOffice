import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { PaymentService } from './payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  reserveRecord: any;
  id: any;
  account: any;
  reservevalue: any;
  constructor(private route: ActivatedRoute, private service: PaymentService) {
    this.route.params.subscribe((params: any) => {
      this.id = params.reserveId;
    });
  }
  AddPayment() {
    console.log('LLLLLLLLLLLLLLLLLLLLLLLLLL');

    console.log(this.reserveRecord);
    this.reservevalue = this.reserveRecord;
    this.visible = true;
  }
  visible = false;
  ngOnInit(): void {
    this.service.getReserve(this.id).subscribe((data: any) => {
      this.reserveRecord = data;
      this.service.getAccount(data.contactId).subscribe((data: any) => {
        this.account = data;
        console.log('KKKKKKKKKKKKKKKKKKKKKKKKKKKK');

        console.log(this.account);
      });
    });
  }
}
