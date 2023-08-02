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
  selector: 'app-document-access-control',
  templateUrl: './document-access-control.component.html',
  styleUrls: ['./document-access-control.component.css']
})
export class DocumentAccessControlComponent implements OnInit {
  @Input() permission: any = [];
  @Input() roleItem: any = [];
  @ViewChild('form') form: ElementRef;
  permissions: any = [];
  storeSub: any;
  currentRoleInfo: any;
  documentItem: any;
  value: boolean;
  isLoading = false;
  loaded: boolean = false;
  constructor(private roleEditService: roleEditService) {
    this.roleEditService.isLoading.subscribe((data: any) => {
      this.isLoading = data;
    });
  }

  onValueChanged(e:any) {
    const keys = Object.keys(this.form.nativeElement.elements);

    var permissions = '';
    var documentId = '';
    keys.forEach((data) => {
      if (data.indexOf('#') > -1) {
        documentId = data;
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
      roleDocumentId: documentId.split('#')[0],
      permission: permissions,
      documentTitle: this.permission.title,
    };
    this.roleEditService.UpdateDocumentAccess(request);
  }
  ngOnInit(): void {
    this.permission.protectedDocumentPermissionDefinitions
      .map((dt: any) => {
        return dt.title;
      })
      .forEach((permissionTitle: any) => {
        var currentValue = false;
        var item = { title: permissionTitle, value: currentValue };

        if (this.roleItem.protectedDocumentItems) {
          this.roleItem.protectedDocumentItems.forEach((roleDocument: any) => {
            if (roleDocument.documentTypeId === this.permission.id) {
              roleDocument.permissions
                .split(',')
                .forEach((roleDocumentPermission: any) => {
                  if (roleDocumentPermission === permissionTitle) {
                    item['value'] = true;
                  }
                });
            }
          });
        }

        this.permissions.push(item);
      });
  }
 
}
