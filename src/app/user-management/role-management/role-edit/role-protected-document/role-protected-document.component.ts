import { Component, Input, OnInit } from '@angular/core';
import { roleEditService } from "../role-edit.service";
@Component({
  selector: 'app-role-protected-document',
  templateUrl: './role-protected-document.component.html',
  styleUrls: ['./role-protected-document.component.css']
})
export class RoleProtectedDocumentComponent implements OnInit {
  @Input() subModuleItems:any;
  @Input() roleItem:any;
    modules: any;
    storeSub: any;
    roleInfo: any;
    moduleItem: any;
    constructor() {
     
    }
  
  
    ngOnInit(): void {
    
  this.modules= this.subModuleItems.moduleDefinitions;
    }
  
  }
  