import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { DesignFromComponent } from './design-from/design-from.component';
import { FormBuilderComponent } from './form-builder/form-builder.component';
import { FormCategoryComponent } from './form-category/form-category.component';
import { FormTranslatesComponent } from './form-translates/form-translates.component';
import { EditFormComponent } from './forms-list/edit-form/edit-form.component';
import { FormsListComponent } from './forms-list/forms-list.component';
import { FromRenderComponent } from './from-render/from-render.component';
import { ImportFormComponent } from './forms-list/import-form/import-form.component';
import { AuditLogComponent } from './audit-log/audit-log.component';

const routes: Routes = [
  {
    path: '',
    component: FormBuilderComponent,

    canActivate: [AuthGuard],
    children: [
      {
        path: 'List',
        component: FormsListComponent,
        children: [
          { path: 'add', component: EditFormComponent },
          { path: 'import', component: ImportFormComponent },
          { path: 'edit/:Id', component: EditFormComponent },
          { path: 'form/:Id', component: DesignFromComponent },
          { path: 'auditLog/:Id', component: AuditLogComponent },
          { path: 'translate/:Id', component: FormTranslatesComponent },
        ],
      },
      {
        path: '',
        redirectTo: 'List',
        pathMatch: 'full',
      },
      {
        path: 'category',
        component: FormCategoryComponent,
        children: [
          { path: 'auditLog/:Id', component: AuditLogComponent },
        ],
      },
      { path: 'design/:Id', component: DesignFromComponent },

      { path: 'render', component: FromRenderComponent },
    ],
  },
];
@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class FormBuilderRoutingModule {}
