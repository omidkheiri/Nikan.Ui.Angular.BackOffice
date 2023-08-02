import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class ErrorParserService {
  errorHandler(errorRes: any) {
    {
      let errorMessage = 'An unknown error occurred!';

      var error = errorRes.error.toString();
      if (error === '[object ProgressEvent]') {
        if(errorRes.message.indexOf("Http failure response for")>-1){
          return "'Server not responding'";
        }
        return errorRes.message;
      }
      if (error.indexOf("Access denied!")>-1 ) {
        return error;
      }
     
      if (!errorRes.error) {
        return errorMessage;
      }
      if (errorRes.error) {
        if (errorRes.error.detail) {
          return errorRes.error.detail;
        }
      }
      switch (errorRes.error.error_description) {
        case 'invalid_username_or_password':
          errorMessage = 'Invalid Email or Password';
          break;
        case 'EMAIL_EXISTS':
          errorMessage = 'This email exists already';
          break;
        case 'EMAIL_NOT_FOUND':
          errorMessage = 'This email does not exist.';
          break;
        case 'INVALID_PASSWORD':
          errorMessage = 'This password is not correct.';
          break;
        case 'Tenant Id value not exists':
          errorMessage = errorRes.error.error_description;
          break;
      }
      return errorMessage;
    }
  }
}
