import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as fromAction from './form-builder.action';
import { ErrorParserService } from 'src/app/services/error-parser.service';

@Injectable({ providedIn: 'root' })
export class FormBuilderEffect {
  addFormBuilderFormStart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromAction.AddFormBuilderStart),
      exhaustMap((action) => {
        return this.http
          .post(
            `${environment.ApiAddress}/FormTemplate/Template`,
            action.FormBuilder
          )
          .pipe(
            map((data: any) => {
              return fromAction.AddFormBuilderSuccess({
                payload: { success: true },
              });
            }),

            catchError((errorRes) => {
              var errorService=new ErrorParserService;
            var errorMessage = errorService.errorHandler(errorRes);
              return of(
                fromAction.AddFormBuilderFail({ payload: errorMessage })
              );
            })
          );
      })
    );
  });
  editFormBuilderFormStart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromAction.EditFormBuilderStart),
      exhaustMap((action) => {
        return this.http
          .put(
            `${environment.ApiAddress}/FormTemplate/Template/${action.Id}`,
            action.FormBuilder
          )
          .pipe(
            map((data: any) => {
              return fromAction.EditFormBuilderSuccess({
                payload: { success: true, FormBuilder: data },
              });
            }),

            catchError((errorRes) => {
              var errorService=new ErrorParserService;
              var errorMessage = errorService.errorHandler(errorRes);
              return of(
                fromAction.AddFormBuilderFail({ payload: errorMessage })
              );
            })
          );
      })
    );
  });
  LoadFormBuilderStart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromAction.LoadFormBuilderStart),
      exhaustMap((action) => {
        return this.http
          .get(`${environment.ApiAddress}/FormTemplate/Template/${action.Id}`)
          .pipe(
            map((data: any) => {
              return fromAction.LoadFormBuilderSuccess({
                FormBuilder: data,
              });
            }),

            catchError((errorRes) => {
              var errorService=new ErrorParserService;
            var errorMessage = errorService.errorHandler(errorRes);
              return of(
                fromAction.AddFormBuilderFail({ payload: errorMessage })
              );
            })
          );
      })
    );
  });

  LoadFormDesignStart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromAction.LoadFormDesignStart),
      exhaustMap((action) => {
        return this.http
          .get(
            `${environment.ApiAddress}/FormTemplateVersion/Template/${action.Id}/Version`
          )
          .pipe(
            map((data: any) => {
              return fromAction.LoadFormDesignSuccess({
                FormDesigner: data,
              });
            }),

            catchError((errorRes) => {
              var errorService=new ErrorParserService;
              var errorMessage = errorService.errorHandler(errorRes);
              return of(
                fromAction.AddFormBuilderFail({ payload: errorMessage })
              );
            })
          );
      })
    );
  });
  addFormDesignFormStart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromAction.AddFormDesignStart),
      exhaustMap((action) => {
        return this.http
          .post(
            `${environment.ApiAddress}/FormTemplateVersion/Template/${action.Id}`,
            { template: action.design.template }
          )
          .pipe(
            map((data: any) => {
              var item = data.formTemplateVersions.sort(
                (a: any, b: any) => b.version - a.version
              );
              data.formTemplateVersions = item;
              var result = data;

              return fromAction.LoadFormDesignSuccess({
                FormDesigner: result,
              });
            }),

            catchError((errorRes) => {
              var errorService=new ErrorParserService;
              var errorMessage = errorService.errorHandler(errorRes);
              return of(
                fromAction.AddFormBuilderFail({ payload: errorMessage })
              );
            })
          );
      })
    );
  });

  LoadFormTranslateStart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromAction.LoadFormTranslateStart),
      exhaustMap((action) => {
        return this.http
          .get(
            `${environment.ApiAddress}/FormTemplateTransalation/Template/${action.Id}/Translation`
          )
          .pipe(
            map((data: any) => {
              return fromAction.LoadFormTranslateSuccess({
                Translate: data,
              });
            }),

            catchError((errorRes) => {
              var errorService = new ErrorParserService();
              var errorMessage = errorService.errorHandler(errorRes);
              return of(
                fromAction.AddFormBuilderFail({ payload: errorMessage })
              );
            })
          );
      })
    );
  });

  //ImportFormTemplateStart
  ImportFormTemplateStart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromAction.ImportFormTemplateStart),
      exhaustMap((action) => {
        return this.http
          .post(
            `${environment.ApiAddress}/formtemplate/template/import`,
            action.FormBuilder,
            {
              headers: new HttpHeaders({
                'Content-Type': 'multipart/form-data',
              }),
            }
          )
          .pipe(
            map((data: any) => {
              return fromAction.AddFormBuilderSuccess({
                payload: { success: true },
              });
            }),

            catchError((errorRes) => {
              console.log(errorRes);

              var errorService = new ErrorParserService();
              var errorMessage = errorService.errorHandler(errorRes);
              return of(
                fromAction.AddFormBuilderFail({ payload: errorMessage })
              );
            })
          );
      })
    );
  });

  constructor(private http: HttpClient, private actions$: Actions) {}
}
