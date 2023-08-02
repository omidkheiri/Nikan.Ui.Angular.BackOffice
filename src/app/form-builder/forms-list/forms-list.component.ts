import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { DxDataGridComponent } from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver-es';
import * as rxjs from 'rxjs';

import { environment } from 'src/environments/environment';
import * as fromApp from '../../store/app.reducer';
import Swal from 'sweetalert2';
import { ErrorParserService } from '../../services/error-parser.service';
@Component({
  selector: 'app-forms-list',
  templateUrl: './forms-list.component.html',
  styleUrls: ['./forms-list.component.css'],
})
export class FormsListComponent implements OnInit, OnDestroy {
  storeSub: any;
  backendAddress=environment.ApiAddress;
  @ViewChild(DxDataGridComponent, { static: false })
  dataGrid: DxDataGridComponent;
  tenatId: string | null;
  categories: CustomStore<any, any>;
  contentReady($event: any) {
    throw new Error('Method not implemented.');
  }
  dataSource: CustomStore<any, any>;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    public errorParserService:ErrorParserService,
    private store: Store<fromApp.AppState>
  ) {
    router.events.subscribe((val: any) => {
     // if (val.formBuilderAdded || val.formBuilderEdited) {
        if (this.dataGrid) this.dataGrid.instance.refresh();
     // }
    });
    this.storeSub = this.store.select('formBuilder');
   
   
  }
 
  // categorySource() {
   
  //         this.httpClient.get(
  //             `${environment.ApiAddress}/FormTemplate/FromCategory?skip=0&take=2000`
            
  //         )
  //         .subscribe((data: any) => {



  //           this.categories=data.data;

          
  //         });
      
    
  // }
  ngOnDestroy(): void {}

  ngOnInit(): void {
    //this.categorySource();
this.initList(this.httpClient);


  }
  initList(httpClient:any) {
    function isNotEmpty(value: any): boolean {
      return value !== undefined && value !== null && value !== '';
    }

    this.dataSource = new CustomStore({
      key: 'id',
      load(loadOptions: any) {
        let params: HttpParams = new HttpParams();
        [
          'skip',
          'take',
          'requireTotalCount',
          'requireGroupCount',
          'sort',
          'filter',
          'totalSummary',
          'group',
          'groupSummary',
        ].forEach((i) => {
          if (i in loadOptions && isNotEmpty(loadOptions[i])) {
            params = params.set(i, JSON.stringify(loadOptions[i]));
          }
        });
        return rxjs
          .lastValueFrom(
            httpClient.get(`${environment.ApiAddress}/FormTemplate/Template/List`, {
              params,
            })
          )
          .then((data: any) => {
            return {
              data: data.data,
              totalCount: data.totalCount,
              summary: data.summary,
              groupCount: data.groupCount,
            };
          })
          .catch((error: any) => {
            var errorService = new ErrorParserService();
            var errorMessage = errorService.errorHandler(error);
            throw `Data Loading Error ${errorMessage}`;
          });
      },
      
      // remove: async(key)=> {
        
      // }
    });
  }




  confirmBox(a: any) {
    Swal.fire({
      title: 'Are you sure want to Remove?',
      text: 'This form template will be removed!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Remove!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.value) {
        this.storeSub.dispatch(
         this.removeTemplate(a)
        );
       
      } else if (result.dismiss === Swal.DismissReason.cancel) {
       
      //  Swal.fire('Cancelled', 'Changes  Cancelled:)', 'success');
      }
    });
  }


  removeTemplate(key:any){




  this.httpClient
    .delete(`${environment.ApiAddress}/FormTemplate/Template/${key}`,{body:{}})
    .toPromise().then(()=>{ this.dataGrid.instance.refresh()}).catch((error:any)=>{
      var errorService=new ErrorParserService;
      
     Swal.fire({text: errorService.errorHandler(error)})
  } );

  }
  onExporting(e: any) {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Sheet');

    exportDataGrid({
      component: e.component,
      worksheet,
      autoFilterEnabled: true,
    }).then(() => {
      workbook.xlsx.writeBuffer().then((buffer: any) => {
        saveAs(
          new Blob([buffer], { type: 'application/octet-stream' }),
          'DataGrid.xlsx'
        );
      });
    });
    e.cancel = true;
  }

  onAddOpen() {
    this.router.navigate(['/dashboard/forms/List/add']);
  }
  importForm(){this.router.navigate(['/dashboard/forms/List/import']);}
downloadTemplate(id:any){


  this.httpClient.get(this.backendAddress+"/formtemplate/templateexport/"+id).subscribe((data:any) => this.downloadFile(data)),
  (error:any) => console.log('Error downloading the file.'),
  () => console.info('OK');
  


}
downloadFile(data: any) {
  

  const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});

  const currentDate = new Date();
  const url= window.URL.createObjectURL(blob);
  Swal.fire({
    title: '<strong>Download Template</strong>',
    icon: 'info',
    showConfirmButton:false,
    showCloseButton: true,
    html:
      'Form template title <b>'+data.Title+'</b>, ' +
      '<br/><a class="swal2-confirm swal2-styled mt-10" href="'+url+'" download="'+data.TechnicalName+"_"+currentDate.toISOString()+'.json" type="button" (click)="download()">Download</a> ' +
     ''
  })
  //window.open(url);
}
download(){}

}


