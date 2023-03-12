import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";


@Injectable({
    providedIn: 'root',
  })
export class DiscountGroupComponentService{
constructor(private http:HttpClient){}
getLocationList(){
    return this.http
    .get<any>(
        `${environment.serviceLocationAddress}/ServiceLocation?AccountId=&SearchTerm=&PageNumber=1&PageSize=500&OrderBy=Title`
    )

}
}