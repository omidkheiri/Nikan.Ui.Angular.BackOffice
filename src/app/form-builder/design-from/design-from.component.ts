import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromAction from '../store/form-builder.action';
import * as fromApp from '../../store/app.reducer';
import { FormBuilder } from '@angular/forms';
import { FormBuilderComponent } from '@formio/angular';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-design-from',
  templateUrl: './design-from.component.html',
  styleUrls: ['./design-from.component.css'],
})
export class DesignFromComponent implements OnInit, OnDestroy {
  @ViewChild('json') jsonElement?: ElementRef | any;
  @ViewChildren('formio') formio: any;
  form: object | null;
  public language: EventEmitter<string>;
  formTitle = `form template design`;
  storeSub: any;
  updatedComponent: any;
  formId: any;
  formInfo: any;
  constructor(
    private router: Router,
    private store: Store<fromApp.AppState>,

    private route: ActivatedRoute
  ) {
    this.storeSub = this.store.select('formBuilder');
    this.formId = this.route.snapshot.paramMap.get('Id');
  }
  ngOnDestroy(): void {
    this.form = null;
    this.store.dispatch(fromAction.ClearState());
  }

  ngOnInit(): void {
    this.store.dispatch(fromAction.LoadFormDesignStart({ Id: this.formId }));

    this.storeSub.subscribe((formState: any) => {
      if (formState.error) {
        Swal.fire({ text: formState.error });
        return;
      }
      if (!formState.formDesignerData) {
        this.form = null;
        return;
      }
      this.formTitle = `form template design: ${
        formState.formDesignerData.title
      } version (    
        ${
          formState.formDesignerData.formTemplateVersions[0] &&
          formState.formDesignerData.formTemplateVersions[0].version
            ? formState.formDesignerData.formTemplateVersions[0].version
            : 1
        } )`;
      this.formInfo = formState.formDesignerData;
      var template =
        formState.formDesignerData.formTemplateVersions[0] &&
        formState.formDesignerData.formTemplateVersions[0].template
          ? formState.formDesignerData.formTemplateVersions[0].template
          : null;

      this.form = template
        ? JSON.parse(template)
        : {
            components: [],
            display: `${formState.formDesignerData.displayType}`,
          };
   
      this.formio.form = this.form;
    });
  }
  popup_hidden($event: any) {
    this.router.navigate(['/dashboard/forms/List']);
  }

  SubmitFrom() {
  

    this.store.dispatch(
      fromAction.AddFormDesignStart({
        Id: this.formId,
        design: { template: JSON.stringify(this.updatedComponent, null, 4) },
      })
    );
  }

  onChangeDesign(event: any) {
    this.updatedComponent = event.form;
  }
}
