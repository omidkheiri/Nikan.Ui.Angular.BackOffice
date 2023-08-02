import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import ArrayStore from 'devextreme/data/array_store';
import * as fromAction from '../../store/module-definitions.action';
import * as fromApp from '../../../store/app.reducer';
import { ActivatedRoute, Router } from '@angular/router';
import { DxFormComponent } from 'devextreme-angular';
import notify from 'devextreme/ui/notify';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {

  editablePermissions: string[];
  storeSub: any;
  document: any;
  Id: any;
  selectedItem: any;
  selectedItemPermission: any;
  error: string;
  submitted: boolean;
  @ViewChild(DxFormComponent, { static: false }) form: DxFormComponent;
  isLoading: boolean;
  documentDefinition: any;
  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router,
    private route:ActivatedRoute,
    private httpClient:HttpClient
  ) {



    this.storeSub = this.store.select('modulesDefinitions');
   httpClient.get( `${environment.ApiAddress}/roles/permissiontype/list?skip=0&take=1000`).subscribe((data:any)=>{

    this.editablePermissions=data.data.map((item:any)=>{return item.title})

   })
 
   
  }

  ngOnInit(): void {
    this.route.params.subscribe((data:any)=>{
this.Id=data.Id;

this.store.dispatch(fromAction.loadDocumentDefinitionByIdStart({id:data.Id}));
      
      
      });
   
    this.storeSub.subscribe((data:any)=>{
      if(this.submitted){
        this.submitted=false;
        this.isLoading=false;
if(data.error){
this.error=data.error;


}else{
  this.submitted=false;
        this.isLoading=false;
  this.error="";
  this.showAlert("Module definition added successfully", "success");
  this.store.dispatch(fromAction.loadDocumentDefinitionsStart());



}




      }

      if(data.selectedDocumentDefinition){
            this.document=JSON.parse(JSON.stringify(data.selectedDocumentDefinition
              ));
              
          this.selectedItem=this.document;

          this.selectedItemPermission=this.selectedItem.protectedDocumentPermissionDefinitions?this.selectedItem.protectedDocumentPermissionDefinitions.map((data:any)=>(data.title)):[];

          this.documentDefinition = Object.assign({}, {title:this.selectedItem.title,permissions: this.selectedItemPermission});


            }
                })
  }
  permissionExtractor(item: any): any[] {
   
    
   return item.protectedDocumentPermissionDefinitions.map((data:any)=>(data.title))
  }


  onRemoveItem(){

    Swal.fire({
      title: 'Are you sure want to remove this document definition?',
      text: 'This document definition and its child will be removed!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Remove',
      cancelButtonText: 'No, Keep it'
    }).then((result) => {
      if (result.value) {
       

       this.httpClient.delete(`${environment.ApiAddress}/ProtectedDocument/delete/${this.Id}`)
       .subscribe((data:any)=>{

this.router.navigate(["/dashboard/users/protectedDocuments"]);


       })


  }
});
}


  onFormSubmit(e: any) {
    this.error = "";
    this.isLoading=true;
    this.submitted=true;
    e.preventDefault();
    var formData = this.form.instance.option('formData');
    this.isLoading = true;
var currentItem="";
if( this.document){
   currentItem=  JSON.parse( JSON.stringify( this.document)).id;
}


    this.store.dispatch(fromAction.updateModulesDefinitionsStart({request:{Id:this.Id,title:formData.title,permission:formData.permissions}}))
  }
  popup_hidden($event: any) {}
  buttonOptions: any = {
    text: 'Save',
    type: 'success',
    useSubmitBehavior: true,
  };
  private showAlert(message: string, type: string) {
   

    notify(
      {
        message: message,
        height: 45,
        width: 325,
        minWidth: 325,
        position: {
          my: 'left bottom',
          at: 'left bottom',
        },
      },
      type,
      4500
    );
  }

}
