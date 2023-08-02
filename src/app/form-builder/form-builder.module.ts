import { Injector, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsListComponent } from './forms-list/forms-list.component';
import { FormBuilderComponent } from './form-builder/form-builder.component';

import { FormBuilderRoutingModule } from './form-builder-routing.module';
import { FormCategoryComponent } from './form-category/form-category.component';
import { FormioAppConfig, FormioModule } from '@formio/angular';
import { DesignFromComponent } from './design-from/design-from.component';
import { AppConfig } from './formio-config';
import { FromRenderComponent } from './from-render/from-render.component';

import {
  DxBulletModule,
  DxButtonModule,
  DxDataGridModule,
  DxFileUploaderModule,
  DxFormModule,
  DxPopupModule,
  DxScrollViewModule,
  DxTemplateModule,
  DxTextAreaModule,
} from 'devextreme-angular';
import { EditFormComponent } from './forms-list/edit-form/edit-form.component';

import { FormTranslatesComponent } from './form-translates/form-translates.component';
import { TranslationsComponent } from './form-translates/translations/translations.component';
import { ImportFormComponent } from './forms-list/import-form/import-form.component';
import { AuditLogComponent } from './audit-log/audit-log.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    FormsListComponent,
    FormBuilderComponent,
    FormCategoryComponent,
    DesignFromComponent,
    FromRenderComponent,
    EditFormComponent,
    FormTranslatesComponent,
    TranslationsComponent,
    ImportFormComponent,
    AuditLogComponent
  ],
  imports: [
    SharedModule,
    RouterModule,
    CommonModule,
    FormBuilderRoutingModule,
    FormioModule,
    DxDataGridModule,
    DxTemplateModule,
    DxBulletModule,
    DxButtonModule,
    DxPopupModule,
    DxFormModule,
    DxTextAreaModule,
    DxScrollViewModule,
    DxFileUploaderModule,
    DxPopupModule,
    DxScrollViewModule,
  ],
  providers: [{ provide: FormioAppConfig, useValue: AppConfig }],
})
export class FormBuilderModule {}
