import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-permission-editor',
  templateUrl: './permission-editor.component.html',
  styleUrls: ['./permission-editor.component.css']
})
export class PermissionEditorComponent implements OnInit {
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
