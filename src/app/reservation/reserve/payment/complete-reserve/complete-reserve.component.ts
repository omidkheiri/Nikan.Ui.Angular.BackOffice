import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ReserveService } from 'src/app/reservation/service/reserve.service';

@Component({
  selector: 'app-complete-reserve',
  templateUrl: './complete-reserve.component.html',
  styleUrls: ['./complete-reserve.component.css']
})
export class CompleteReserveComponent implements OnInit {
 @ViewChild("popup") popup:any;
  submitted: boolean = false;
  saved: boolean;
  Locations: any;

visible: boolean;
  reserveRecordId: string;
  tripId: string;
  constructor(private service: ReserveService,private http:HttpClient,private router:Router) {


var id =router.url.split("/");

this.reserveRecordId=id[id.length-1];
this.tripId=id[4];
  }
  ngOnDestroy(): void {}

  ngOnInit(): void {
   

  }

  onSubmit(form: NgForm) {
    console.log(form);
    this.submitted = true;
    if (!form.valid) {
      return;
    }
    try {
      this.service
        .completeReserve(this.reserveRecordId,form.controls["ReserveId"].value)
        .subscribe((a: any) => {
          this.saved = true;

         
        });
    } catch (err: any) {
      console.log(err);
    }
  }
  navigatePayment(){

this.router.navigate(["/dashboard/reserve/Payment/"+this.tripId])


  }
}
