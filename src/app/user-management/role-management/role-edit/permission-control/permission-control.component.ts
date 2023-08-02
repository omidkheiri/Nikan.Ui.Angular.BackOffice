import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { roleEditService } from '../role-edit.service';

@Component({
  selector: 'app-permission-control',
  templateUrl: './permission-control.component.html',
  styleUrls: ['./permission-control.component.css'],
})
export class PermissionControlComponent implements OnInit {
  @Input() permission: any = [];
  @Input() roleItem: any = [];
  @ViewChild('form') form: ElementRef;
  permissions: any = [];
  storeSub: any;
  currentRoleInfo: any;
  moduleItem: any;
  value: boolean;
  isLoading = false;
  loaded: boolean = false;
  constructor(private roleEditService: roleEditService) {
    this.roleEditService.isLoading.subscribe((data: any) => {
      this.isLoading = data;
    });
  }

  updateValue() {
    const keys = Object.keys(this.form.nativeElement.elements);

    var permissions = '';
    var moduleId = '';
    keys.forEach((data) => {
      if (data.indexOf('#') > -1) {
        moduleId = data;
        if (this.form.nativeElement.elements[data].value === 'true') {
          permissions += data.split('#')[1] + ',';
        }
      }
    });
    if (permissions.slice(-1) === ',') {
      permissions = permissions.slice(0, -1);
    }

    var request = {
      roleId: this.roleItem.id,
      roleModuleId: moduleId.split('#')[0],
      permission: permissions,
      moduleTitle: this.permission.title,
    };
    this.roleEditService.UpdatePermission(request);
  }
  ngOnInit(): void {
    this.permission.modulePermissionDefinitions
      .map((dt: any) => {
        return dt.title;
      })
      .forEach((permissionTitle: any) => {
        var currentValue = false;
        var item = { title: permissionTitle, value: currentValue };

        if (this.roleItem.moduleItems) {
          this.roleItem.moduleItems.forEach((roleModule: any) => {
            if (roleModule.moduleId === this.permission.id) {
              roleModule.permissions
                .split(',')
                .forEach((roleModulePermission: any) => {
                  if (roleModulePermission === permissionTitle) {
                    item['value'] = true;
                  }
                });
            }
          });
        }

        this.permissions.push(item);
      });
  }
  onValueChanged(e: any) {
    this.updateValue();
  }
}
