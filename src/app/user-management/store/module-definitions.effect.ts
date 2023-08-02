import { Injectable } from '@angular/core';
import { Actions, act, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, tap } from 'rxjs';
import * as fromAction from './module-definitions.action';
import { HttpClient, HttpParams } from '@angular/common/http';
import { exhaustMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';
import { ErrorParserService } from 'src/app/services/error-parser.service';

@Injectable({ providedIn: 'root' })
export class ModuleDefinitionEffect {
  getRoleByIdStart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromAction.getRoleByIdStart),
      exhaustMap((action) => {
        return this.http
          .get(`${environment.ApiAddress}/roles/internalroles/${action.id}`)
          .pipe(
            map((data: any) => {
              return fromAction.RoleByIdLoaded({
                item: data,
              });
            }),

            catchError((errorRes) => {
              var errorService = new ErrorParserService();
              var errorMessage = errorService.errorHandler(errorRes);
              return of(
                fromAction.loadModuleDefinitionFailed({ error: errorMessage })
              );
            })
          );
      })
    );
  });

  moduleDefinitionLoaded$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromAction.loadModulesDefinitionsStart),
      exhaustMap((action) => {
        return this.http
          .get(`${environment.ApiAddress}/modulesdefinition/list`)
          .pipe(
            map((data: any) => {
              return fromAction.modulesDefinitionsLoaded({
                modulesDefinitions: data,
              });
            }),

            catchError((errorRes) => {
              var errorService = new ErrorParserService();
              var errorMessage = errorService.errorHandler(errorRes);
              return of(
                fromAction.loadModuleDefinitionFailed({ error: errorMessage })
              );
            })
          );
      })
    );
  });

  loadModuleDefinitionByIdStart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromAction.loadModuleDefinitionByIdStart),
      exhaustMap((action) => {
        return this.http
          .get(`${environment.ApiAddress}/modulesdefinition/item/${action.id}`)
          .pipe(
            map((data: any) => {
              return fromAction.moduleDefinitionByIdLoaded({
                selectedModulesDefinition: data,
              });
            }),

            catchError((errorRes) => {
              var errorService = new ErrorParserService();
              var errorMessage = errorService.errorHandler(errorRes);
              return of(
                fromAction.loadModuleDefinitionFailed({ error: errorMessage })
              );
            })
          );
      })
    );
  });

  addModuleDefinition$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromAction.addModulesDefinitionsStart),
      exhaustMap((action) => {
        return this.http
          .post(`${environment.ApiAddress}/ModulesDefinition`, {
            Request: {
              moduleId: !action.request.module ? '' : action.request.module,
              Title: action.request.title,
            },
          })
          .pipe(
            map((data: any) => {
              return fromAction.addModulesPermissionStart({
                request: { Id: data.id, permission: action.request.permission },
              });
            }),

            catchError((errorRes) => {
              var errorService = new ErrorParserService();
              var errorMessage = errorService.errorHandler(errorRes);
              return of(
                fromAction.loadModuleDefinitionFailed({ error: errorMessage })
              );
            })
          );
      })
    );
  });

  addModulePermission$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromAction.addModulesPermissionStart),
      exhaustMap((action) => {
        return this.http
          .post(`${environment.ApiAddress}/ModulesDefinition/permission`, {
            Request: {
              moduleId: action.request.Id,
              permissionTitle: action.request.permission,
            },
          })
          .pipe(
            map((data: any) => {
              return fromAction.moduleDefinitionByIdLoaded({
                selectedModulesDefinition: data,
              });
            }),

            catchError((errorRes) => {
              var errorService = new ErrorParserService();
              var errorMessage = errorService.errorHandler(errorRes);
              return of(
                fromAction.loadModuleDefinitionFailed({ error: errorMessage })
              );
            })
          );
      })
    );
  });

  updateModulePermission$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromAction.updateModulesDefinitionsStart),
      exhaustMap((action) => {
        return this.http
          .put(
            `${environment.ApiAddress}/ModulesDefinition/${action.request.Id}`,
            {
              title: action.request.title,
              permissionTitle: action.request.permission,
            }
          )
          .pipe(
            map((data: any) => {
              return fromAction.moduleDefinitionByIdLoaded({
                selectedModulesDefinition: data,
              });
            }),

            catchError((errorRes) => {
              var errorService = new ErrorParserService();
              var errorMessage = errorService.errorHandler(errorRes);
              return of(
                fromAction.loadModuleDefinitionFailed({ error: errorMessage })
              );
            })
          );
      })
    );
  });

  loadDocumentDefinitionsStart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromAction.loadDocumentDefinitionsStart),
      exhaustMap((action) => {
        let params: HttpParams = new HttpParams();
        params.set('take', 1000);
        params.set('skip', 0);

        return this.http
          .get(`${environment.ApiAddress}/protecteddocument/list`, { params })
          .pipe(
            map((data: any) => {
              return fromAction.loadProtectedDocumentLoaded({
                item: data,
              });
            }),

            catchError((errorRes) => {
              var errorService = new ErrorParserService();
              var errorMessage = errorService.errorHandler(errorRes);
              return of(
                fromAction.loadModuleDefinitionFailed({ error: errorMessage })
              );
            })
          );
      })
    );
  });

  loadDocumentDefinitionByIdStart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromAction.loadDocumentDefinitionByIdStart),
      exhaustMap((action) => {
        return this.http
          .get(`${environment.ApiAddress}/protecteddocument/item/${action.id}`)
          .pipe(
            map((data: any) => {
              return fromAction.documentDefinitionByIdLoaded({
                selectedDocumentDefinition: data,
              });
            }),

            catchError((errorRes) => {
              var errorService = new ErrorParserService();
              var errorMessage = errorService.errorHandler(errorRes);
              return of(
                fromAction.loadModuleDefinitionFailed({ error: errorMessage })
              );
            })
          );
      })
    );
  });

  addDocumentDefinitionsStart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromAction.addDocumentDefinitionsStart),
      exhaustMap((action) => {
        return this.http
          .post(`${environment.ApiAddress}/protecteddocument`, {
            Request: {
              DocumentId: !action.request.document
                ? ''
                : action.request.document,
              Title: action.request.title,
              Permissions: action.request.permission,
            },
          })
          .pipe(
            map((data: any) => {
              return fromAction.documentDefinitionByIdLoaded({
                selectedDocumentDefinition: data,
              });
            }),

            catchError((errorRes) => {
              var errorService = new ErrorParserService();
              var errorMessage = errorService.errorHandler(errorRes);
              return of(
                fromAction.loadModuleDefinitionFailed({ error: errorMessage })
              );
            })
          );
      })
    );
  });

  updateDocumentDefinitionsStart1$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromAction.updateDocumentDefinitionsStart),
      exhaustMap((action) => {
        return this.http
          .put(
            `${environment.ApiAddress}/protecteddocument/${action.request.Id}`,
            {
              title: action.request.title,
              permissionTitle: action.request.permission,
            }
          )
          .pipe(
            map((data: any) => {
              return fromAction.documentDefinitionByIdLoaded({
                selectedDocumentDefinition: data,
              });
            }),

            catchError((errorRes) => {
              var errorService = new ErrorParserService();
              var errorMessage = errorService.errorHandler(errorRes);
              return of(
                fromAction.loadModuleDefinitionFailed({ error: errorMessage })
              );
            })
          );
      })
    );
  });

  RoleAddProtectedDocumentStart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromAction.RoleAddProtectedDocumentStart),
      exhaustMap((action) => {
        return this.http
          .get(
            `${environment.ApiAddress}/roles/internalroles/edit/${action.request.roleId}/adddocumentaccess/${action.request.documentId}`
          )
          .pipe(
            map((data: any) => {
              return fromAction.loadProtectedDocumentLoaded({
                item: data,
              });
            }),

            catchError((errorRes) => {
              var errorService = new ErrorParserService();
              var errorMessage = errorService.errorHandler(errorRes);
              return of(
                fromAction.loadModuleDefinitionFailed({ error: errorMessage })
              );
            })
          );
      })
    );
  });

  constructor(
    private http: HttpClient,
    private actions$: Actions,
    private store: Store
  ) {}
}
