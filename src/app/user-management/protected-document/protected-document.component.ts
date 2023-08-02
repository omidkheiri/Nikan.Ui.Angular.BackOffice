import { Component, OnInit, ViewChild } from '@angular/core';
import { Modules } from '../models/ModuleDefinition';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromAction from '../store/module-definitions.action';
import * as fromApp from '../../store/app.reducer';
import { DxTreeViewComponent } from 'devextreme-angular';

@Component({
  selector: 'app-protected-document',
  templateUrl: './protected-document.component.html',
  styleUrls: ['./protected-document.component.css'],
})
export class ProtectedDocumentComponent implements OnInit {
  @ViewChild(DxTreeViewComponent, { static: false })
  treeView: DxTreeViewComponent;
  selectedNode = '';
  documents: any[];
  storeSub: any;
  errorMessage: any;
  itemlelected: boolean=false;
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
      if (data.protectedDocument) {
        if(this.itemlelected){}else{
          this.itemlelected=false; 
        this.documents = JSON.parse(
          JSON.stringify(data.protectedDocument)
        );
        }
        
      }
      this.selectedNode = data.selectedModuleId;
    });

    this.router.events.subscribe(route => {
      this.treeView.instance.unselectAll();
      this.treeView.instance.selectItem(router.url.split("/")[5]);
      this.store.dispatch(fromAction.loadDocumentDefinitionsStart());
   })

  }

  ngOnInit(): void {
    this.store.dispatch(fromAction.loadDocumentDefinitionsStart());
  }
  selectItem(data: any) {
    this.itemlelected=true;
    this.treeView.instance.unselectAll();
    this.router.navigate(['/dashboard/users/protectedDocuments/edit', data.itemData.id]);
  }
}
