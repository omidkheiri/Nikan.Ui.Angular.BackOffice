import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { roleEditService } from './role-edit.service';
@Component({
  selector: 'app-role-edit',
  templateUrl: './role-edit.component.html',
  styleUrls: ['./role-edit.component.css'],
})
export class RoleEditComponent implements OnInit {
  formTitle: string = 'Role Management';
  storeSub: any;
  itemId: any;
  modules: any;
  roleInfo: any;
  activeTab = 'permission';
  protectedDocuments: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private roleEditService: roleEditService
  ) {
    route.params.subscribe((data: any) => {
      this.itemId = data.Id;


      
     

     
    });
  }

  ngOnInit(): void {
    this.roleEditService.GetCurrentRole(this.itemId);


   
    this.roleEditService.currentRole.subscribe((data: any) => {
      
       this.roleInfo = data;
      if(data){

        this.roleEditService.GetModules();

        this.roleEditService.GetProtectedDocument();

      }
     });

    this.roleEditService.moduleDefinitions.subscribe((data: any) => {
      if(data){
      this.modules = data.filter((data: any) => {
        return !data.moduleDefinitionId;
      });

      
    }
    });
    this.roleEditService.protectedDocuments.subscribe((data: any) => {
      this.protectedDocuments = data;
    });
    
  
    


  }

  popup_hidden($event: any) {
    this.router.navigate(['/dashboard/users/roles']);
  }

  OnTab(e: string) {
    this.activeTab = e;
  }
}
