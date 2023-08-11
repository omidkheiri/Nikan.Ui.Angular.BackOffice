import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import CustomStore from 'devextreme/data/custom_store';
import { environment } from 'src/environments/environment';
import * as fromAction from 'src/app/crm/store/location/location.action';
import * as fromStore from '../../../../../store';
import { ActivatedRoute, Params } from '@angular/router';
import { map } from 'rxjs';
import "devextreme/data/array_store";
import ArrayStore from 'devextreme/data/array_store';
import { Location } from '@angular/common';
@Component({
  selector: 'app-exclude-air-lines',
  templateUrl: './exclude-air-lines.component.html',
  styleUrls: ['./exclude-air-lines.component.css']
})
export class ExcludeAirLinesComponent implements OnInit {
  dataSource: any[]=[];
  accountId: any;
  id: any;
  editMode: boolean;
  location: any;
  airLines: any;

  constructor(
    private _location: Location,
    
    
    private route: ActivatedRoute,private httpClient: HttpClient,  private store: Store<fromStore.CrmModuleState>) {
    store.select<any>('CRM').subscribe((data: any) => {
      this.accountId = data.account.account.id;
    });
    route.params.subscribe((params: Params) => {
      this.id = params['locationId'];
      this.editMode = params['locationId'] != null;
      this.store.dispatch(
        fromAction.loadingCurrentLocation({ payload: this.id })
      );
    });
    function isNotEmpty(value: any): boolean {
      return value !== undefined && value !== null && value !== '';
    }







   
  }

  ngOnInit(): void {
    this.httpClient.get(`${environment.flightAddress}/AirlineName?skip=0&take=3000&requireTotalCount=true`)
    .subscribe((data:any)=>{
    
    var items=data.data.map((data:any)=>{
      return {id:data.id,name:data.name}
    });
    
    
    this.airLines=
    new ArrayStore({
      data:items,
          key: "id"
      
    });
    
    var items=data.data.map((data:any)=>{
      return {id:data.id,name:data.name}
    });
  
    
    })




    this.store
    .select<any>('CRM')
    .pipe(map((location) => location))
    .subscribe((loc) => {
       this.location = loc.location.currentlocation;


      


       this.dataSource= JSON.parse(JSON.stringify( this.location.excludeAirlines));
            
         
       

     
      });
    }
    RowChanged(e:any){

console.log(e);


    }


    insert(e:any){


this.httpClient.post(`${environment.FinancialAddress}/ServiceLocation/${this.location.id}/ExcludAirline/Add`,{
  "airlineId": e.data.airlineId
}).subscribe((data:any)=>{


  this.store.dispatch(
    fromAction.loadingCurrentLocation({ payload: this.id })
  );



})


    }

    delete(e:any){
      this.httpClient.delete(`${environment.FinancialAddress}/ServiceLocation/${this.location.id}/ExcludAirline/${e.data.airlineId}/delete`).subscribe((data:any)=>{
      
      
        this.store.dispatch(
          fromAction.loadingCurrentLocation({ payload: this.id })
        );
      
      
      
      })
      
      
          }

    



    oncancel(){


      this._location.back();
      this.store.dispatch(fromAction.loadLocations({ payload: this.accountId }));


    }
  }


