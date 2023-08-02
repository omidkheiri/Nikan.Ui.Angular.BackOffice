import { Component, OnInit, ViewChild } from '@angular/core';
import { Modules } from '../models/ModuleDefinition';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromAction from '../store/module-definitions.action';
import * as fromApp from '../../store/app.reducer';
import { DxTreeViewComponent } from 'devextreme-angular';

@Component({
  selector: 'app-module-manager',
  templateUrl: './module-manager.component.html',
  styleUrls: ['./module-manager.component.css'],
})
export class ModuleManagerComponent implements OnInit {
  @ViewChild(DxTreeViewComponent, { static: false })
  treeView: DxTreeViewComponent;
  selectedNode = '';
  modules: Modules[];
  storeSub: any;
  errorMessage: any;
  loaded=false;
  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router,
    private route: ActivatedRoute
  ) {
   
    this.storeSub = this.store.select('modulesDefinitions');
    this.storeSub.subscribe((data: any) => {
      if(data.error){

        this.errorMessage=data.error;
      }
      if (data.moduleDefinitions && data.moduleDefinitions.modulesDefinitions) {
       if(!this.loaded){
        this.loaded=true;
        
        this.modules = JSON.parse(
          JSON.stringify(data.moduleDefinitions.modulesDefinitions)
        );
       }
      }
      

    });

    this.router.events.subscribe((route:any) => {

      this.treeView.instance.selectItem(route.url.split("/")[5]);
      this.store.dispatch(fromAction.loadModulesDefinitionsStart());
   })

  }

  ngOnInit(): void {
   
    this.store.dispatch(fromAction.loadModulesDefinitionsStart());
  }
  selectItem(data: any) {
    this.treeView.instance.unselectAll();
   
    this.router.navigate(['/dashboard/users/modules/edit', data.itemData.id]);
  
  }
}
