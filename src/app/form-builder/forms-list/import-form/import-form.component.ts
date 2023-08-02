import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import CustomStore from 'devextreme/data/custom_store';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

import * as fromAction from '../../store/form-builder.action';
import * as fromApp from '../../../store/app.reducer';
import notify from 'devextreme/ui/notify';
import { DxFormComponent } from 'devextreme-angular';
import Swal from 'sweetalert2';
import { ErrorParserService } from 'src/app/services/error-parser.service';
@Component({
  selector: 'app-import-form',
  templateUrl: './import-form.component.html',
  styleUrls: ['./import-form.component.css'],
})
export class ImportFormComponent implements OnInit {
  @ViewChild(DxFormComponent, { static: false }) form: DxFormComponent;
  formTemplate: any;
  technicalName = '';
  isLoading: boolean;
  private storeSub: any;
  recipeForm: FormGroup;
  error: string;
  categoryOption: object;
  formId: string | null;
  formMode: string;

  formTitle = 'Add  form template info';

  categorySource: CustomStore<any, any>;
  readonly: boolean;
  submitted = false;

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
          .toPromise()
          .catch((error: any) => {
            var errorService = new ErrorParserService();
            var errorMessage = errorService.errorHandler(error);
          
            Swal.fire({ text: errorMessage, width: 800 });
            return [];
          });
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
      this.readonly = false;

      this.isLoading = formState.loading;

      this.error = formState.error;
      if (this.error) {
        this.showAlert(this.error, 'error');
      } else {
        if (formState.FormBuilderAdded && this.submitted) {
          this.submitted = false;
          this.showAlert('Form template imported', 'success');
          this.router.navigate(['/dashboard/forms/List']);
        }
      }
    });
    this.initForm();
  }
  initForm() {
    if (this.formId) {
      this.formTitle = 'Edit form template info';

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

    this.submitted = true;

    this.isLoading = true;

    var a = this.form.instance.option('formData');

    let fileToUpload = <File>a.file[0];
    const formData1 = new FormData();
    formData1.append('file', fileToUpload, fileToUpload.name);
    formData1.append('categoryId', a.categoryId);

    this.storeSub.dispatch(
      fromAction.ImportFormTemplateStart({
        FormBuilder: formData1,
      })
    );
    this.readonly = false;

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
}
