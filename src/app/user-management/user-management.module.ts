import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagementComponent } from './user-management/user-management.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserPanelComponent } from './user-panel/user-panel.component';
import { RouterModule } from '@angular/router';
import { UserManagementRoutingModule } from './user-management-routing.module';
import { DxAccordionModule, DxBulletModule, DxButtonModule, DxCheckBoxModule, DxDataGridModule, DxDateBoxModule, DxFormModule, DxPopupModule, DxScrollViewModule, DxSelectBoxModule, DxSwitchModule, DxTagBoxModule, DxTemplateModule, DxTextBoxModule, DxTreeViewModule, DxValidatorModule } from 'devextreme-angular';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserRolesComponent } from './user-panel/user-roles/user-roles.component';
import { ProfileComponent } from './user-panel/profile/profile.component';
import { ResetPasswordComponent } from './user-panel/reset-password/reset-password.component';
import { ModuleManagerComponent } from './module-manager/module-manager.component';
import dxTreeView from 'devextreme/ui/tree_view';
import { ModuleEditComponent } from './module-manager/module-edit/module-edit.component';
import { ModuleAddComponent } from './module-manager/module-add/module-add.component';
import { UserAddComponent } from './user-add/user-add.component';
import { ProtectedDocumentComponent } from './protected-document/protected-document.component';
import { RoleManagementComponent } from './role-management/role-management.component';
import { RoleEditComponent } from './role-management/role-edit/role-edit.component';
import { PermissionEditorComponent } from './role-management/role-edit/permission-editor/permission-editor.component';
import { PermissionControlComponent } from './role-management/role-edit/permission-control/permission-control.component';
import { RoleProtectedDocumentComponent } from './role-management/role-edit/role-protected-document/role-protected-document.component';
import { PermissionListComponent } from './permission-list/permission-list.component';
import { DocumentAddComponent } from './protected-document/document-add/document-add.component';
import { DocumentEditComponent } from './protected-document/document-edit/document-edit.component';
import { DocumentAccessControlComponent } from './role-management/role-edit/document-access-control/document-access-control.component';
import { DocumentAccessEditorComponent } from './role-management/role-edit/document-access-editor/document-access-editor.component';
import { AuditLogComponent } from './audit-log/audit-log.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        UserManagementComponent,
        UserListComponent,
        UserPanelComponent,
        UserAddComponent,
        UserRolesComponent,
        ProfileComponent,
        ResetPasswordComponent,
        ModuleManagerComponent,
        ModuleEditComponent,
        ModuleAddComponent,
        ProtectedDocumentComponent,
        DocumentAddComponent,
        DocumentEditComponent,
        RoleManagementComponent,
        RoleEditComponent,
        PermissionEditorComponent,
        PermissionControlComponent,
        RoleProtectedDocumentComponent,
        PermissionListComponent,
        DocumentAccessControlComponent,
        DocumentAccessEditorComponent,
        AuditLogComponent,
        AddCustomerComponent

    ],
    imports: [RouterModule,
        CommonModule,
        UserManagementRoutingModule,
        DxSelectBoxModule,
        DxCheckBoxModule,
        DxTextBoxModule,
        DxDateBoxModule,
        DxButtonModule,
      
        DxAccordionModule,
        DxBulletModule,

        DxTagBoxModule,
        DxSwitchModule,
        DxScrollViewModule,
        DxDataGridModule,
        DxTemplateModule,
      DxTreeViewModule,
      
        DxPopupModule,
        DxFormModule,
        FormsModule,
        ReactiveFormsModule,
        DxTextBoxModule,
        DxValidatorModule, SharedModule]
})
export class UserManagementModule {}
