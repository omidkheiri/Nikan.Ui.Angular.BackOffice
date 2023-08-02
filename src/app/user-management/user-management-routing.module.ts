import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { UserListComponent } from './user-list/user-list.component';

import { UserManagementComponent } from './user-management/user-management.component';
import { UserPanelComponent } from './user-panel/user-panel.component';
import { UserAddComponent } from './user-add/user-add.component';
import { ModuleManagerComponent } from './module-manager/module-manager.component';
import { ModuleEditComponent } from './module-manager/module-edit/module-edit.component';
import { ModuleAddComponent } from './module-manager/module-add/module-add.component';
import { ProtectedDocumentComponent } from './protected-document/protected-document.component';
import { RoleManagementComponent } from './role-management/role-management.component';
import { RoleEditComponent } from './role-management/role-edit/role-edit.component';
import { PermissionListComponent } from './permission-list/permission-list.component';
import { DocumentEditComponent } from './protected-document/document-edit/document-edit.component';
import { DocumentAddComponent } from './protected-document/document-add/document-add.component';
import { AuditLogComponent } from './audit-log/audit-log.component';

const routes: Routes = [
  {
    path: '',
    component: UserManagementComponent,

    canActivate: [AuthGuard],
    children: [
      { path: 'userList', component: UserListComponent,children:
      [ { path: 'add', component: UserAddComponent },
      { path: 'auditLog/:id', component: AuditLogComponent },
    ]},
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'panel/:Id', component: UserPanelComponent },
      { path: 'protectedDocuments', component: ProtectedDocumentComponent,children:
      [
      { path: 'add', component: DocumentAddComponent },
      { path: 'add/:Id', component: DocumentAddComponent },
      { path: 'edit/:Id', component: DocumentEditComponent }
    ]},
      { path: 'permissionType', component: PermissionListComponent},
      { path: 'modules', component: ModuleManagerComponent,children:
      [
      { path: 'add', component: ModuleAddComponent },
      { path: 'add/:Id', component: ModuleAddComponent },
      { path: 'edit/:Id', component: ModuleEditComponent }
    ]},
    { path: 'roles', component: RoleManagementComponent,children:
      [
      { path: 'editRole/:Id', component: RoleEditComponent },
      { path: 'add', component: ModuleAddComponent },
      { path: 'add/:Id', component: ModuleAddComponent },
      { path: 'edit/:Id', component: ModuleEditComponent },
      { path: 'auditLog/:id', component: AuditLogComponent }
    ]}
    
    
    
    ,
     
    ],
  },
];
@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class UserManagementRoutingModule {}
