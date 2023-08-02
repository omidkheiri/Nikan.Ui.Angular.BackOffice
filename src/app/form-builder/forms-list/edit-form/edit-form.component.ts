import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import * as fromAction from '../../store/form-builder.action';
import * as fromApp from '../../../store/app.reducer';
import notify from 'devextreme/ui/notify';
import { Store } from '@ngrx/store';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DxFormComponent } from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';
import { HttpClient, HttpParams } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { ErrorParserService } from 'src/app/services/error-parser.service';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css'],
})
export class EditFormComponent implements OnInit, OnDestroy {
  readonly = false;
  @ViewChild(DxFormComponent, { static: false }) form: DxFormComponent;
  displayTypeSource = [
    { title: 'Form', value: 'form' },
    { title: 'Wizard', value: 'wizard' },
  ];
  formTemplate: any;
  technicalName = '';
  isLoading: boolean;
  private storeSub: any;
  recipeForm: FormGroup;
  error: string;
  categoryOption: object;
  formId: string | null;
  formMode: string;
  editMode: boolean;
  formTitle = 'Add  form template info';

  categorySource: CustomStore<any, any>;
  entityTitleSource: CustomStore<Object | undefined, any>;
  constructor(
    private httpClient: HttpClient,
    private store: Store<fromApp.AppState>,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.storeSub = this.store.select('formBuilder');
    this.formId = this.route.snapshot.paramMap.get('Id');
    function isNotEmpty(value: any): boolean {
      return value !== undefined && value !== null && value !== '';
    }
    this.categorySource = new CustomStore({
      key: 'id',
      byKey(key) {
        return httpClient
          .get(`${environment.ApiAddress}/FormTemplate/FromCategory/${key}`)
          .toPromise().catch((error) =>
          {
            var errorService = new ErrorParserService();
            var errorMessage = errorService.errorHandler(error);
            
          Swal.fire({ text: errorMessage, width: 800 })
        }
          
          );

      },
      load(loadOptions: any) {
        let params: HttpParams = new HttpParams();
        [
          'skip',
          'take',
          'requireTotalCount',
          'requireGroupCount',
          'sort',
          'filter',
          'totalSummary',
          'group',
          'groupSummary',
        ].forEach((i) => {
          if (i in loadOptions && isNotEmpty(loadOptions[i])) {
            params = params.set(i, JSON.stringify(loadOptions[i]));
          }
        });
        return lastValueFrom(
          httpClient.get(
            `${environment.ApiAddress}/FormTemplate/FromCategory`,
            {
              params,
            }
          )
        )
          .then((data: any) => {
            return {
              data: data.data,
              totalCount: data.totalCount,
              summary: data.summary,
              groupCount: data.groupCount,
            };
          })
          .catch((error) => {
            var errorService = new ErrorParserService();
            var errorMessage = errorService.errorHandler(error);
            Swal.fire({ text: errorMessage, width: 800 });
            return [];
          });
      },
    });

    this.entityTitleSource= new CustomStore({
      key: 'id',
      byKey(key) {
        return httpClient
          .get(`${environment.ApiAddress}/Entities/List`)
          .toPromise();
      },
      load(loadOptions: any) {
        let params: HttpParams = new HttpParams();
        [
          'skip',
          'take',
          'requireTotalCount',
          'requireGroupCount',
          'sort',
          'filter',
          'totalSummary',
          'group',
          'groupSummary',
        ].forEach((i) => {
          if (i in loadOptions && isNotEmpty(loadOptions[i])) {
            params = params.set(i, JSON.stringify(loadOptions[i]));
          }
        });
        return lastValueFrom(
          httpClient.get(
            `${environment.ApiAddress}/Entities/List`,
            {
              params,
            }
          )
        )
          .then((data: any) => {
            return {
              data: data,
              totalCount: data.totalCount,
              summary: data.summary,
              groupCount: data.groupCount,
            };
          })
          .catch((error) => {
            var errorService = new ErrorParserService();
            var errorMessage = errorService.errorHandler(error);
            throw `Data Loading Error ${errorMessage}`;
          });
      },
    });



  }
  ngOnDestroy(): void {
    this.storeSub.dispatch(fromAction.FormBuilderResetForm());
    this.formTemplate = {};
  }
  buttonOptions: any = {
    text: 'Save',
    type: 'success',
    useSubmitBehavior: true,
  };
  ngOnInit(): void {
    this.storeSub.subscribe((formState: any) => {
      //    this.form.readOnly = false;
      this.readonly = false;

      this.isLoading = formState.loading;

      this.error = formState.error;
      if (this.error) {
        this.showAlert(this.error, 'error');
      } else {
        if (!this.editMode) {
          if (formState.formBuilderAdded) {
            this.showAlert(
              'Form ' + formState.formBuilderFormData.title + ' added ',
              'success'
            );
            this.router.navigate(['/dashboard/forms/List']);
          }
        } else {
          if (formState.formBuilderEdited) {
            this.showAlert(
              'Form info ' + formState.formBuilderFormData.title + ' updated ',
              'success'
            );
            this.router.navigate(['/dashboard/forms/List']);
          } else {
            this.technicalName = formState.formBuilderFormData.technicalName;
            this.formTemplate = Object.assign(
              {},
              formState.formBuilderFormData
            );
          }
        }
      }
    });
    this.initForm();
  }
  initForm() {
    if (this.formId) {
      this.formTitle = 'Edit form template info';
      this.editMode = true;
      this.isLoading = true;
      this.storeSub.dispatch(
        fromAction.LoadFormBuilderStart({
          Id: this.formId,
        })
      );
      this.readonly = false;
    }
  }
  popup_hidden($event: any) {
    this.router.navigate(['/dashboard/forms/List']);
  }
  onFormSubmit(e: SubmitEvent) {
    e.preventDefault();

    this.isLoading = true;

    var a = this.form.instance.option('formData');


    if (this.editMode) {
      if (this.technicalName != a.technicalName) {
        this.confirmBox(a);
      } else {
        this.storeSub.dispatch(
          fromAction.EditFormBuilderStart({
            Id: this.formId ? this.formId : '',
            FormBuilder: {
              title: a.title,
              categoryId: a.categoryId,
              description: a.description,
              technicalName: a.technicalName,
              publicAccess: a.publicAccess,
              displayType: a.displayType,
              entityTitle: a.entityTitle,
            },
          })
        );
      }
    } else {
      this.storeSub.dispatch(
        fromAction.AddFormBuilderStart({
          FormBuilder: {
            title: a.title,
            categoryId: a.categoryId,
            description: a.description,
            technicalName: a.technicalName,
            publicAccess: a.publicAccess,
            displayType: a.displayType,
            entityTitle: a.entityTitle,
          },
        })
      );
      this.readonly = false;
    }
    e.preventDefault();
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

  confirmBox(a: any) {
    Swal.fire({
      title: 'Are you sure want to Change Technical Name?',
      text: 'You will need to change this parameter wherever you use it!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Change it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.value) {
        this.storeSub.dispatch(
          fromAction.EditFormBuilderStart({
            Id: this.formId ? this.formId : '',
            FormBuilder: {
              title: a.title,
              categoryId: a.categoryId,
              description: a.description,
              technicalName: a.technicalName,
              publicAccess: a.publicAccess,
              displayType: a.displayType,
              entityTitle: a.entityTitle
            },
          })
        );
        this.isLoading = false;
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.isLoading = false;
        Swal.fire('Cancelled', 'Changes  Cancelled:)', 'success');
      }
    });
  }
}
