import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';

import ArrayStore from 'devextreme/data/array_store';
import * as fromAction from '../../store/module-definitions.action';
import * as fromApp from '../../../store/app.reducer';
import { ActivatedRoute, Router } from '@angular/router';
import { DxFormComponent } from 'devextreme-angular';
import notify from 'devextreme/ui/notify';
@Component({
  selector: 'app-module-add',
  templateUrl: './module-add.component.html',
  styleUrls: ['./module-add.component.css'],
})
export class ModuleAddComponent implements OnInit {
  @ViewChild(DxFormComponent, { static: false }) form: DxFormComponent;
  formTitle = 'Add module';
  editablePermissions: string[];
  storeSub: any;
  module: any;
  Id: any;
  selectedItem: any;
  selectedItemPermission: any;
  error: string;
  submitted: boolean;
  isLoading: boolean;
  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.storeSub = this.store.select('modulesDefinitions');

    this.editablePermissions = [
      'create',
      'update',
      'delete',
      'view',
      'approved',
      'processing',
      'rejected',
      'disabled',
    ];
  }

  ngOnInit(): void {
    this.route.params.subscribe((data: any) => {
      if(data.Id){
      this.store.dispatch(
        fromAction.loadModuleDefinitionByIdStart({ id: data.Id })
      );
    }else{

      this.store.dispatch(
        fromAction.resetSelectedModuleDefinition()
      );
      }
    });

    this.storeSub.subscribe((data: any) => {
      if(this.submitted){
        this.submitted=!this.submitted;
        this.isLoading=data.loading;
if(data.error){

this.error=data.error;

}else{

  this.showAlert("Module definition added successfully", "success");
  this.store.dispatch(fromAction.loadModulesDefinitionsStart());
  this.router.navigate(["/dashboard/users/modules"]);

}




      }
      if (data.selectedModulesDefinition) {
        this.module = JSON.parse(
          JSON.stringify(data.selectedModulesDefinition)
        );

        this.selectedItem = this.module;
        try{
        this.selectedItemPermission =
        this.selectedItem.modulePermissionDefinitions.map((data: any) => data.title);
        }catch{}
      }
    });
  }
  permissionExtractor(item: any): any[] {
    return item.modulePermissionDefinitions.map((data: any) => data.title);
  }
  onFormSubmit(e: any) {
    this.error = "";
    this.submitted=true;
    e.preventDefault();
    var formData = this.form.instance.option('formData');
   
    
    this.isLoading = true;



var currentItem="";
if( this.module){
   currentItem=  JSON.parse( JSON.stringify( this.module)).id;

}


    this.store.dispatch(fromAction.addModulesDefinitionsStart({request:{module:currentItem?currentItem:"",title:formData.title,permission:formData.permissions}}))
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
          my: 'right bottom',
          at: 'right bottom',
        },
      },
      type,
      4500
    );
  }
}
