import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromStore from '../../../../../store';
import { map } from 'rxjs';
import { Location } from '@angular/common'
import { AccountService } from 'src/app/crm/Services/account.service';
@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.css']
})
export class DiscountComponent implements OnInit {
  serviceId: string;
  locationId:string;
  stor$: any;
  DiscountGroup:any;
  currentLocation: any;
  constructor(private router:Router,
     private route: ActivatedRoute,
    private store: Store<fromStore.CrmModuleState>,
   
     private accountService: AccountService,private location: Location) {

route.params.subscribe((data:any)=>{

this.locationId=data.locationId;


})


   this.stor$=   this.store.select<any>('CRM') ;



     }

  ngOnInit(): void {
   

    this.stor$.subscribe((data:any)=>{
console.log(data.location.locations,this.locationId);

this.currentLocation= data.location.locations.find((d:any)=>{return d.id===this.locationId})


    })



  }
  onHide(){
    console.log('/account/'+this.serviceId+'/supplier/locations');
    
this.location.back();
  }
  DiscountGroupSelected(e:any){

this.DiscountGroup=e;


  }
}
