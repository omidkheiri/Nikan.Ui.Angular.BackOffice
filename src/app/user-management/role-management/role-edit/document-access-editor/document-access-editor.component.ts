import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-document-access-editor',
  templateUrl: './document-access-editor.component.html',
  styleUrls: ['./document-access-editor.component.css']
})
export class DocumentAccessEditorComponent implements OnInit {
@Input() subDocumentItems:any;
@Input() roleItem:any;
  modules: any;
  storeSub: any;
  roleInfo: any;
  moduleItem: any;
  constructor() {
   
  }


  ngOnInit(): void {
  
this.modules= this.subDocumentItems.protectedDocuments;
  }

}
