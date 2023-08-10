import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ReserveService } from 'src/app/reservation/service/reserve.service';

@Component({
  selector: 'app-refund',
  templateUrl: './refund.component.html',
  styleUrls: ['./refund.component.css']
})
export class RefundComponent implements OnInit {
  reserveRecordId: string;
  tripId: string;
  submitted: boolean;
  saved: boolean;

  constructor(private service: ReserveService,private http:HttpClient,private router:Router) { 
    var id =router.url.split("/");
    
    this.reserveRecordId=id[id.length-1];
    this.tripId=id[4];}

  ngOnInit(): void {
  }
  navigatePayment(){

    window.location.replace('/dashboard/reserve/Payment/'+this.tripId);
    
      }
      onSubmit(form: NgForm) {
        console.log(form);
        this.submitted = true;
        if (!form.valid) {
          return;
        }
        try {
          this.service
            .refund(form.controls["PenaltyAmount"].value,this.tripId)
            .subscribe((a: any) => {
              this.saved = true;
    
             
            });
        } catch (err: any) {
          console.log(err);
        }
      }

}
