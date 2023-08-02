import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserIdleService } from 'angular-user-idle';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class roleEditService {
  public moduleDefinitions = new BehaviorSubject<any>(null);
  public protectedDocuments = new BehaviorSubject<any>(null);
  public currentRole = new BehaviorSubject<any>(null);
  public roleId = new BehaviorSubject<string>("");
  public isLoading = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) {}

  GetModules() {
    return this.http
      .get(`${environment.ApiAddress}/ModulesDefinition/list`)
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
      .get(`${environment.ApiAddress}/ProtectedDocument/list`, { params })
      .subscribe((data: any) => {
        this.protectedDocuments.next(data);
      });
  }

  GetCurrentRole(id:any) {
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


  UpdatePermission(request:any)
  {
    this.isLoading.next(true);
   return this.http
   .put(`${environment.ApiAddress}/roles/InternalRoles/EditPermission/${this.roleId.value}`,
   {
     "moduleId": request.roleModuleId,
     "permission": request.permission,
     "moduleTitle":request.moduleTitle
   }
   
   ) .subscribe(() => {
   
    this.GetCurrentRole(this.roleId.value);
     });


  }

  UpdateDocumentAccess(request:any)
  {
    this.isLoading.next(true);
   return this.http
   .put(`${environment.ApiAddress}/roles/InternalRoles/EditDocumentAccess/${this.roleId.value}`,
   {
     "documentId": request.roleDocumentId,
     "permission": request.permission,
     "documentTitle":request.documentTitle
   }
   
   ) .subscribe(() => {
   
    this.GetCurrentRole(this.roleId.value);
     });


  }





}
