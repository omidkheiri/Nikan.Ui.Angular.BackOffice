import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

import { Store } from '@ngrx/store';

import * as fromStore from '../../../../../store';
import * as fromAction from '../../../../../store/location/location.action';
import DataSource from 'devextreme/data/data_source';

import { AccountService } from '../../../../../Services/account.service';
@Component({
  selector: 'app-discount-group',
  templateUrl: './discount-group.component.html',
  styleUrls: ['./discount-group.component.css']
})
export class DiscountGroupComponent implements OnInit,OnChanges {
  title:string="----";
  @Output() DiscountGroupEmiter = new EventEmitter<any>();
  @Input() location: any;
  dataSource:DataSource;
  accountId: string;
selectedrow:any;
  constructor(
   
    private store: Store<fromStore.CrmModuleState>,
    private AccountService: AccountService
  ) {
   

}
ngOnChanges(changes: SimpleChanges) {

  if(this.selectedrow&&this.selectedrow.id&&this.location){

   
    
  var a=  this.location.discountGroups.find((data:any)=>{return data.id===this.selectedrow.id})
      this.DiscountGroupEmiter.emit(a);
    

  }
  this.dataSource =new DataSource({
      
    key: "id",
    load: (loadOptions) => {
    return  this.location?this.location.discountGroups:[]
        // ...
    },
    insert: (values) => {
      console.log(values);
      
this.store.dispatch(fromAction.addDiscountGroup({accountId:this.accountId, DiscountGroup: { Title: values.title, Description: "string", ServicelocationId: this.location.id }}))
      return  this.location.discountGroups
        // ...
    },
    update: (key, values) => {
      
      this.store.dispatch(fromAction.updateDiscountGroup({groupId:key, accountId:this.accountId, DiscountGroup: { Title: values.title, Description: "string", ServicelocationId: this.location.id }}))
      return  this.location.discountGroups
        // ...
        
    },
    remove: (key) => {
      this.store.dispatch(fromAction.removeDiscountGroup({groupId:key, accountId:this.accountId, ServicelocationId: this.location.id }))
      return  this.location.discountGroups
        // ...
    }
}); 

}
  ngOnInit(): void {
    this.AccountService.getaccountIdObs().subscribe((accountId) => {
     this.accountId= accountId; });
    
   
    this.dataSource =new DataSource({
      
      key: "id",
      load: (loadOptions) => {
      return  this.location?this.location.discountGroups:[]
          // ...
      },
      insert: (values) => {
        console.log(values);
        
this.store.dispatch(fromAction.addDiscountGroup({accountId:this.accountId, DiscountGroup: { Title: values.title, Description: "string", ServicelocationId: this.location.id }}))
        return  this.location.discountGroups
          // ...
      },
      update: (key, values) => {
        
        this.store.dispatch(fromAction.updateDiscountGroup({groupId:key, accountId:this.accountId, DiscountGroup: { Title: values.title, Description: "string", ServicelocationId: this.location.id }}))
        return  this.location.discountGroups
          // ...
          
      },
      remove: (key) => {
        this.store.dispatch(fromAction.removeDiscountGroup({groupId:key, accountId:this.accountId, ServicelocationId: this.location.id }))
        return  this.location.discountGroups
          // ...
      }
  }); 

  }

 
  RowChanged(e:any){

   this.selectedrow=e.selectedRowsData[0];
this.DiscountGroupEmiter.emit(e.selectedRowsData[0]);
    
    
  }


}

