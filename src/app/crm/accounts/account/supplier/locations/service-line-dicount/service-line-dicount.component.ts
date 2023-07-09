import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import DataSource from 'devextreme/data/data_source';

import * as fromStore from '../../../../../store';
import * as fromAction from '../../../../../store/location/location.action';
import { AccountService } from 'src/app/crm/Services/account.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import CustomStore from 'devextreme/data/custom_store';
import { lastValueFrom } from 'rxjs';
@Component({
  selector: 'app-service-line-dicount',
  templateUrl: './service-line-dicount.component.html',
  styleUrls: ['./service-line-dicount.component.css']
})
export class ServiceLineDicountComponent implements OnInit , OnChanges{
  dataSource:DataSource;
  @Input() DiscountGroup:any
  accountId: string;
  ServiceLineSource: any;
  constructor(private http:HttpClient,
    private store: Store<fromStore.CrmModuleState>,
    private AccountService: AccountService) { }

  ngOnChanges(changes: SimpleChanges) {
    
    
    this.DiscountGroup = this.DiscountGroup;

if(this.DiscountGroup){
    
      this.ServiceLineSource=   new CustomStore({
        key: 'ID',
        loadMode: 'raw', // omit in the DataGrid, TreeList, PivotGrid, and Scheduler
        load: (loadOptions) => {

          
            return lastValueFrom(this.http.get(`${environment.serviceLineAddress}/ServiceLine/Location/${this.DiscountGroup.servicelocationId}`))
                .catch(() => { throw 'Data loading error' });
        }
    });
    
   
    this.dataSource =new DataSource({
      
      key: "serviceLineId",
      load: (loadOptions) => {
        console.log(this.DiscountGroup.serviceLineDiscounts);
        
      return  this.DiscountGroup?this.DiscountGroup.serviceLineDiscounts:[]
         
      },
      insert: (values) => {
      
        
this.store.dispatch(fromAction.addDiscountGroupServiceLine(
 {accountId:this.accountId,
   ServicelocationId:this.DiscountGroup.servicelocationId+'',
   DiscountGroupId:this.DiscountGroup.id,
    ServiceLineDiscount: 
    { ServiceLineId:values.serviceLineId+''  , DiscountPercents :values.discountPercents +0 }}))
        return  this.DiscountGroup.serviceLineDiscounts
         
      },
      update: (key, values) => {

        this.store.dispatch(fromAction.addDiscountGroupServiceLine(
          {accountId:this.accountId,
            ServicelocationId:this.DiscountGroup.servicelocationId+'',
            DiscountGroupId:this.DiscountGroup.id,
             ServiceLineDiscount: 
             { ServiceLineId:key+''  , 
             DiscountPercents :values.discountPercents +0 }})) 
       return  this.DiscountGroup.serviceLineDiscounts
          
      }
     
  }); 
    }
   
  

  }



  ngOnInit(): void {
   
    this.AccountService.getaccountIdObs().subscribe((accountId) => {
      this.accountId= accountId; });
      
   
    
  }

}
