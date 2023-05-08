import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  public moduleDefinitions = new BehaviorSubject<any>(null);
  public protectedDocuments = new BehaviorSubject<any>(null);
  public currentRole = new BehaviorSubject<any>(null);
  public currentUserAccessList = new BehaviorSubject<any>(null);
  public roleId = new BehaviorSubject<string>('');
  public userId = new BehaviorSubject<string>('');
  public isLoading = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) {}

  

 
 

}
