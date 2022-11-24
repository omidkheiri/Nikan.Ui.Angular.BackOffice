import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthService } from '../auth.service';
import * as fromAuth from '../store';
import * as AuthActions from '../store/auth.actions';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  errorMessage = '';
  constructor(
    private service: AuthService,
    private store: Store<fromAuth.AuthModuleState>
  ) {}

  ngOnInit(): void {}
  onSubmit(form: NgForm) {
    this.errorMessage = '';
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

    // this.service.signIn(value.username, value.password).subscribe(
    //   (subscriber: any) => {

    //     this.service.isAuthenticated.next(true);
    //     localStorage.setItem('token', JSON.stringify(subscriber));
    //   },
    //   (error) => {
    //     switch (error.error.error_description) {
    //       case 'invalid_username_or_password':
    //         this.errorMessage = 'Invalid user name or password';
    //         break;

    //       default:
    //         this.errorMessage = '';
    //         break;
    //     }
    //   }
    // );
  }
}
