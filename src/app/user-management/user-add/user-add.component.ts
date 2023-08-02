import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { DxFormComponent } from 'devextreme-angular';
import notify from 'devextreme/ui/notify';
import * as fromAction from '../store/backOfficeUser.action';
import * as fromApp from '../../store/app.reducer';
@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  readonly = false;
  @ViewChild(DxFormComponent, { static: false }) form:DxFormComponent;
  backOfficeUser: any;
  isLoading: boolean;
  private storeSub: any;
  recipeForm: FormGroup;
  error: string;

  formMode: string;
  editMode: boolean;
  formTitle = 'Add New Back-Office User';
  Complexity: boolean;
  submitted=false;

  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router,
  ) {
    this.storeSub = this.store.select('backOfficeUser');
    
  }
  ngOnDestroy(): void {
    this.error = "";
    this.router.navigate(['/dashboard/users/userList']);
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
       
          if (data.backOfficeAdded&&this.submitted) {
            this.submitted=false;
            this.showAlert(
              'Back-Office User ' + data.backOfficeUserData.name+' '+data.backOfficeUserData.lastName  + ' added ',
              'success'
            );
            this.router.navigate(['/dashboard/users/userList/']);
          }
       
      }
    });

  } catch{}
   
  }

  popup_hidden($event: any) {
    this.error = "";
    this.router.navigate(['/dashboard/users/userList']);
  }
  onFormSubmit(e: SubmitEvent) {
    this.error = "";
    this.submitted=true;
    e.preventDefault();
    var formData = this.form.instance.option('formData');
    this.isLoading = true;

this.store.dispatch(fromAction.addBackOfficeUserStart({backOfficeUser:
  {
    "name": formData.name,
    "lastName": formData.lastName,
    "email": formData.email,
    "mobile":formData.mobile ,
    "passwordModel": {
      "password": formData.password,
      "passwordConfirm":formData.passwordConfirm
    }
  
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


  complexyValidation(value:any) {
 
    var minMaxLength = /^[\s\S]{8,32}$/,
        upper = /[A-Z]/,
        lower = /[a-z]/,
        number = /[0-9]/,
        special = /[^A-Za-z0-9]/,
        count = 0;
    
        
var password=value.value;

    if (minMaxLength.test(password)) {
       if (upper.test(password)) count++;
        if (lower.test(password)) count++;
        if (number.test(password)) count++;
        if (special.test(password)) count++;
        
        
    }

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(count >= 4);
      }, 1);
    });
  
    
}
passwordComparison = () =>{
  
  
  return this.form.instance.option('formData').password;}

 
}