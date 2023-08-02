import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromAction from '../store/form-builder.action';
import * as fromApp from '../../store/app.reducer';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-form-translates',
  templateUrl: './form-translates.component.html',
  styleUrls: ['./form-translates.component.css'],
})
export class FormTranslatesComponent implements OnInit {
  @ViewChild('json') jsonElement?: ElementRef | any;
  @ViewChild('formio') formio: any;
  public language: EventEmitter<string>;
  formTitle = `form template design`;
  public form: object = {
    components: [],
  };
  storeSub: any;
  formId: any;
  formInfo: any;
  Languages: any;
  selectedtranslation: any;
  LanguageList: any;
  constructor(
    private router: Router,
    private store: Store<fromApp.AppState>,
    private httpClient: HttpClient,
    private route: ActivatedRoute
  ) {
    this.storeSub = this.store.select('formBuilder');
    this.formId = this.route.snapshot.paramMap.get('Id');
  }
  ngOnInit(): void {
    this.store.dispatch(fromAction.LoadFormDesignStart({ Id: this.formId }));

    this.storeSub.subscribe((formState: any) => {
      this.formTitle = `form template translate: ${formState.formDesignerData.title} `;
      this.formInfo = formState.formDesignerData;

      var template = formState;

      this.Languages = template.formDesignerData.formTemplateTranslations;
      this.LanguageList = JSON.parse(JSON.stringify(this.Languages));
      try {
        if (template) {
          this.form = template
            ? JSON.parse(template)
            : JSON.parse('{components: []},');
        }
      } catch (error) {}
    });
  }
  popup_hidden($event: any) {
    this.router.navigate(['/dashboard/forms/List']);
  }

  changeLanguage(lang: string) {
    this.language.emit(lang);
  }
  viewTranslation(e: any) {
    this.selectedtranslation = this.Languages.find((data: any) => {
      return data.lang + '' === e.selectedRowsData[0].lang + '';
    });
  }
  selectionChanged(event: any) {
    var oldItem = this.LanguageList.find((data: any) => {
      return data.id === event.data.id;
    });

    this.httpClient
      .put(
        `${environment.ApiAddress}/FormTemplateTranslation/Template/${this.formId}/Translation/${event.data.id}`,
        {
          lang: event.data.lang,
          translation: event.data.translation,
          langLabel: event.data.langLabel,
        }
      )
      .subscribe((data:any)=>{

        this.store.dispatch(fromAction.LoadFormDesignStart({ Id: this.formId }));

      });
  }

  selectionInserted(event: any) {
    this.httpClient
      .post(
        `${environment.ApiAddress}/FormTemplateTranslation/Template/${this.formId}`,
        {
          lang: event.data.lang,
          translation: '{}',
          langLabel: event.data.langLabel,
        }
      )
      .subscribe((data:any)=>{

        this.store.dispatch(fromAction.LoadFormDesignStart({ Id: this.formId }));

      });
  }
  selectionRemove(event: any) {
    this.httpClient
      .delete(
        `${environment.ApiAddress}/FormTemplateTranslation/Template/${this.formId}/Translation/${event.data.lang}`
      )
      .subscribe((data:any)=>{

        this.store.dispatch(fromAction.LoadFormDesignStart({ Id: this.formId }));

      });
  }
}
