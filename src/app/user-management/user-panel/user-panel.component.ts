import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromAction from '../store/backOfficeUser.action';
import * as fromApp from '../../store/app.reducer';
@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css']
})
export class UserPanelComponent implements OnInit {
itemId=""
activeMenu="profile"
UserData:any;
private storeSub: any;
  constructor(private route:ActivatedRoute, private store: Store<fromApp.AppState>) {
    this.storeSub = this.store.select('backOfficeUser');

route.params.subscribe((data:any)=>{ 
  

  this.itemId=data.Id})


   }

  ngOnInit(): void {

    this.storeSub.subscribe((data: any) => {
     
          if (data.backOfficeUserData) {
            this.UserData=data.backOfficeUserData;
          }




  })}
onNav(to:any){
 this.activeMenu=to;

}



}
