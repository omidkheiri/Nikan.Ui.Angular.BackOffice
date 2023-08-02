import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { DxFormComponent } from 'devextreme-angular';
import notify from 'devextreme/ui/notify';
import { Store } from '@ngrx/store';
import * as fromAction from '../../store/backOfficeUser.action';
import * as fromApp from '../../../store/app.reducer';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
@Input() itemId :string;
  readonly = false;
  @ViewChild(DxFormComponent, { static: false }) form:DxFormComponent;
  backOfficeUser: any;
  isLoading: boolean;
  private storeSub: any;
  recipeForm: FormGroup;
  error: string;

  formMode: string;
  editMode: boolean;
  formTitle = 'Edit Back-Office User';
  Complexity: boolean;
  formdata:any;
  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router,
  ) {
    this.storeSub = this.store.select('backOfficeUser');
    
  }
  ngOnDestroy(): void {
    this.error = "";
   
  }

  buttonOptions: any = {
    text: 'Save',
    type: 'success',
    useSubmitBehavior: true,
  };
  ngOnInit(): void {
    this.error = "";

    try{
    this.storeSub.subscribe((data: any) => {
      this.readonly = false;

      this.isLoading = data.loading;

      this.error = data.error;
      
      
      if (this.error) {
        this.showAlert(this.error, 'error');
      } else {
       
          if (data.backOfficeUserLoaded) {
           
            
           
            this.formdata = Object.assign({}, data.backOfficeUserData);
          }
       
      }
    });

  } catch{}
  this.storeSub.dispatch(fromAction.loadBackOfficeUserStart({
    
    userId:this.itemId
  
  })) 
  this.isLoading=true;
  }

  onFormSubmit(e: SubmitEvent) {
    this.error = "";
    e.preventDefault();
    var formData = this.form.instance.option('formData');
    this.isLoading = true;

this.store.dispatch(fromAction.editBackOfficeUserStart({itemId:this.itemId, backOfficeUser:
  {
    "name": formData.name,
    "lastName": formData.lastName,
    "email": formData.email,
    "mobile":formData.mobile ,
    "isLocked": formData.isLocked
  
  
}}))
   
  }





  private showAlert(message: string, type: string) {
   

    notify(
      {
        message: message,
        height: 45,
        width: 325,
        minWidth: 325,
        position: {
          my: 'right bottom',
          at: 'right bottom',
        },
      },
      type,
      4500
    );
  }



 
}
