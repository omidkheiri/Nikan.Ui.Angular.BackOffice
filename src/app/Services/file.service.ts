import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParamsOptions,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { ErrorParserService } from './error-parser.service';
@Injectable({
  providedIn: 'root',
})
export class MainFileService {
  fileName: any;
  constructor(public http: HttpClient, private router: Router) {}
  public uploadFile = async (
    storage: any,
    file: any,
    fileName: any,
    dir: any,
    evt: any,
    url: any,
    options: any,
    fileKey: any,
    originalName: any
  ) => {
    return new Promise((resolve, reject) => {
      console.log(
        storage,
        file,
        fileName,
        dir,
        evt,
        url,
        options,
        originalName
      );

      const formData = new FormData();
      formData.append('file', file);

      const options1 = {
        headers: new HttpHeaders({
          'Content-Type': 'multipart/form-data',
        }),
      };
      var filetype = fileName.split('X')[0];
      var customerId = this.router.url.split('/')[4];
      const upload$ = this.http.post(
        `${environment.ApiAddress}/BackOfficeOperations/customer/${customerId}/document/upload/${filetype}`,
        formData,
        options1
      );

      upload$.subscribe(
        (data: any) => {
          resolve({
            storage: 'url',
            name: data.fileName,
            fileName: data.fileName,
            url: data.fileName,
            fileKey: data.fileName,
            size: file.size,
            type: file.type,

            originalName: file.originalName,
            data: '',
          });
        },
        (error) => {
          var errorService = new ErrorParserService();
          var errorMessage = errorService.errorHandler(error);
          reject(errorMessage);
        }
      );
    });
    //do something
  };
  public deleteFile = async (fileInfo: any) => {
    return new Promise((resolve, reject) => {
      this.http
        .delete(
          `${environment.ApiAddress}/BackOfficeOperations/customer/${
            this.router.url.split('/')[4]
          }/document/Delete/${fileInfo.fileName}`
        )
        .subscribe(
          (data: any) => {
            return resolve('');
          },
          (error: any) => {
            var errorService = new ErrorParserService();
            var errorMessage = errorService.errorHandler(error);

            Swal.fire({ text: errorMessage, width: 800 });
          }
        );
    });
  };

  async downloadFile(fileInfo: any, options: any) {
    this.http
      .get(
        `${environment.ApiAddress}/BackOfficeOperations/customer/${
          this.router.url.split('/')[4]
        }/document/download/${fileInfo.fileName}`,
        {
          headers: {
            Accept: '*/*',
          },
          responseType: 'blob',
        }
      )
      .subscribe(
        (data: any) => {
          this.download(data, fileInfo.fileName);
        },
        (error: any) => {

          
   this.parseErrorBlob(error).subscribe((data)=>{

    Swal.fire({ text: data, width: 800 });

   },error=>{

    Swal.fire({ text: error, width: 800 });
   })

          
        }
      );
  }

  download(data: any, name: string) {
    const blob = new Blob([data]);

    const currentDate = new Date();
    const url = window.URL.createObjectURL(blob);
    Swal.fire({
      title: '<strong>Download File</strong>',
      icon: 'info',
      showConfirmButton: false,
      showCloseButton: true,
      html:
        '<b>' +
        name +
        '</b>, ' +
        '<br/><a class="swal2-confirm swal2-styled mt-10" href="' +
        url +
        '" download="' +
        name +
        '" type="button" (click)="download()">Download</a> ' +
        '',
    });
    //window.open(url);
  }
  parseErrorBlob(err: HttpErrorResponse): Observable<any> {
    const reader: FileReader = new FileReader();

    const obs = Observable.create((observer: any) => {
      reader.onloadend = (e) => {

       var message= reader.result;

        observer.error(message);
        observer.complete();
      }
    });
    reader.readAsText(err.error);
    return obs;
}
}
