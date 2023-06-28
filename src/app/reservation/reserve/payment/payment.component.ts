import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { PaymentService } from './payment.service';
import { Trip } from '../models/Trip';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  trip: Trip|any;
  id: any;
  account: any;
  tripValue: any;
  Locations: any;
  constructor(private router:Router, private route: ActivatedRoute, private service: PaymentService,
    private http:HttpClient) {
    this.route.params.subscribe((params: any) => {
      this.id = params.reserveId;
    });
    this.http
    .get(
      `${environment.serviceLocationAddress}/ServiceLocation?AccountId=&SearchTerm=&PageNumber=1&PageSize=500&OrderBy=Title`
    ).subscribe((data1: any) => {
   

      this.Locations=data1;})








  }
  getLocationTitle(e:any):string{

var item=this.Locations.find((data:any)=>{return data.id===e});
if(!item){
  return "محل ارائه سرویس موحود نیست";
}
return  item.title;


  }
  AddPayment() {
    this.tripValue = this.trip;
    this.visible = !this.visible;
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
  recivePayment(e: any) {
    this.visible = false;
    this.service.getReserve(this.id).subscribe((data: any) => {
      this.trip = data;
      this.service.getAccount(data.contactId).subscribe((data: any) => {
        this.account = data;
      });
    });
  }
  navtoPrint(e:any){

this.router.navigate([`/dashboard/reserve/Payment/${e}/print/${e}`])


  }
}
