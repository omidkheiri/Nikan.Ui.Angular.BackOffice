import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  errorMessage = '';
  constructor(private service: AuthService) {}

  ngOnInit(): void {}
  onSubmit(form: NgForm) {
    this.errorMessage = '';
    if (!form.valid) {
      return;
    }
    const value = form.value;

    console.log(value);
    this.service.signIn(value.username, value.password).subscribe(
      (subscriber) => {
        console.log(subscriber);
      },
      (error) => {
        switch (error.error.error_description) {
          case 'invalid_username_or_password':
            this.errorMessage = 'Invalid user name or password';
            break;

          default:
            this.errorMessage = '';
            break;
        }
      }
    );
  }
}
