import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthService } from '../auth.service';
import * as fromAuth from '../store';
import * as AuthActions from '../store/auth.actions';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  passwordInputType = true;
  isLoginMode = true;
  isLoading = false;
  error: string = '';
  errorMessage = '';
  submitted = false;
  alertHost!: ViewContainerRef;
  private closeSub: Subscription;
  private storeSub: any;
  tenantError: any;

  constructor(
    private service: AuthService,
    private store: Store<fromAuth.AuthModuleState>
  ) {
    this.storeSub = this.store.select('auth');

  }

  ngOnInit(): void {
    this.storeSub.subscribe((authState: any) => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
      this.tenantError=authState.incorrectTenant;
      if (this.error) {
        this.showErrorAlert(this.error);
        this.errorMessage=this.error;
      }
      
    });
  }
  onSubmit(form: NgForm) {
    this.errorMessage = '';
    this.submitted = true;

    if (!form.valid) {
      return;
    }
    const value = form.value;

    this.store.dispatch(
      AuthActions.LoginStart({
        payload: {
          email: value.username,
          password: value.password,
        },
      })
    );
  }
  showPassword() {

    this.passwordInputType = !this.passwordInputType;
  }
  private showErrorAlert(message: string) {
    // const alertCmp = new AlertComponent();
    // const alertCmpFactory =
    //   this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    // const viewContainerRef = this.alertHost;
    // this.errorMessage = message;
    // const componentRef = viewContainerRef.createComponent(AlertComponent);
    // componentRef.instance.message = message;
  }
}
