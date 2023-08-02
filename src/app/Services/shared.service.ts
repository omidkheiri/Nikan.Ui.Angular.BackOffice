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

  GetCurrentUserAccessList() {
    if (!this.currentUserAccessList.value) {
      this.http
        .get(`${environment.ApiAddress}/backofficeuser/useraccesslist`)
        .subscribe((data: any) => {
          this.currentUserAccessList.next(data);
        });
    }
  }
  GetCurrentUserAccessListWhitToken(token:any) {
    if (!this.currentUserAccessList.value) {
      this.http
        .get(`${environment.ApiAddress}/backofficeuser/useraccesslist`)
        .subscribe((data: any) => {
          this.currentUserAccessList.next(data);
        });
    }
  }

  GetModules() {
    return this.http
      .get(`${environment.ApiAddress}/modulesdefinition/list`)
      .subscribe((data: any) => {
        this.moduleDefinitions.next(data);
        return data;
      });
  }
  GetProtectedDocument() {
    let params: HttpParams = new HttpParams();
    params.set('take', 1000);
    params.set('skip', 0);

    return this.http
      .get(`${environment.ApiAddress}/roles/ProtectedDocument/list`, { params })
      .subscribe((data: any) => {
        this.protectedDocuments.next(data);
      });
  }

  GetCurrentRole(id: any) {
    this.roleId.next(id);
    let params: HttpParams = new HttpParams();
    params.set('take', 1000);
    params.set('skip', 0);

    return this.http
      .get(`${environment.ApiAddress}/roles/internalroles/${id}`)
      .subscribe((data: any) => {
        this.currentRole.next(data);
        this.isLoading.next(false);
      });
  }
}
