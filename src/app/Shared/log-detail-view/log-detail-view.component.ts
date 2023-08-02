import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'log-detail-view',
  templateUrl: './log-detail-view.component.html',
  styleUrls: ['./log-detail-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogDetailViewComponent implements OnInit {
  @Input() changes: any;
  pattern =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  items: { key: string; value: string }[] = [{ key: '', value: '' }];
  translateItem: any;
  KeyList: any[];

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {}
  JsonPars(e: any) {
    
    if (e) {
      var item = JSON.parse(e);
      return item;
    } else {
      return e;
    }
  }
  JsonItems(e: any) {
    //   if(e){
    //
    //
    // return item;
    //   }else{
    // return e;

    //   }
  
    var items: { key: string; value: string; className: string }[] = [];
    try {
      var text = e.replace(/\'/g, '"');
      var item = JSON.parse(text);

      this.KeyList = Object.keys(item);

      this.KeyList.forEach((data: any) => {
        var i = {
          key: data,
          value: item[data] ? item[data] : '',
          className: '',
        };

        if (typeof i.value === 'string') {
          if (this.pattern.test(i.value)) {
            i.value = this.getDocumentType(i.value);
            items.push(i);
          } else {
            items.push(i);
          }
        }

        if (typeof i.value === 'object') {
          if (i.key === 'file') {
            i.value = i.value[0].originalName;
            items.push(i);
          } else {
            var valueKeyList = Object.keys(i.value);
            if ((valueKeyList[0] = '0')) {
              i.value.forEach((ele: any) => {
                var inner = this.parseInnerObject(ele);
             

                inner.forEach((el: any) => {
                  items.push(el);
                });
              });
            }
          }
        }
      });
    } catch (error) {}

    return items;
  }

  JsonOldItems(
    e: any,
    newItem: any
  ): { key: string; value: string; className: string }[] {
    var items: { key: string; value: string; className: string }[] = [];
    try {
      var text = e.replace(/\'/g, '"');
      var item = JSON.parse(text);

      this.KeyList = Object.keys(item);

      this.KeyList.forEach((data: any) => {
        var i = {
          key: data,
          value: item[data] ? item[data] : '',
          className: '',
        };

        newItem.forEach((newData: any) => {
          if (newData.key === i.key && newData.value != i.value)
            i.className = 'bg-danger text-white ';
        });

        if (typeof i.value === 'string') {
          if (this.pattern.test(i.value)) {
            i.value = this.getDocumentType(i.value);
            items.push(i);
          } else {
            items.push(i);
          }
        }

        if (typeof i.value === 'object') {
          if (i.key === 'file') {
            i.value = i.value[0].originalName;
            items.push(i);
          } else {
            var valueKeyList = Object.keys(i.value);
            if ((valueKeyList[0] = '0')) {
              var inner = this.parseInnerObject(i.value[0]);
           

              inner.forEach((el: any) => {
                items.push(el);
              });
            }
          }
        }
      });
    } catch (error) {}

    return items;
  }

  getDocumentType(id: string): string {
    var documentType = localStorage.getItem('documentTypes');
    if (documentType) {
      var documentTypes = JSON.parse(documentType);
      var documentTypeItem = documentTypes.find((data: any) => {
        return data.id.toLowerCase() === id;
      });
      if (documentTypeItem) {
        return documentTypeItem.title;
      }
    }

    return id;
  }
  parseInnerObject(item: any): any {
    var items: { key: string; value: string; className: string }[] = [];
    var innerKeyList = Object.keys(item);
    if(innerKeyList.find((data:String)=>{return data==="fileKey"})){

return[];

    }
    innerKeyList.forEach((data: any) => {
      var i = { key: data, value: item[data] ? item[data] : '', className: '' };




      if (typeof i.value === 'string') {
        if (this.pattern.test(i.value)) {
          i.value = this.getDocumentType(i.value);
          items.push(i);
        } else {
          items.push(i);
        }
      } 
      if (typeof i.value === 'object') {
        if (i.key === 'file') {
          i.value = i.value[0].originalName;
          items.push(i);
        } else {
          var valueKeyList = Object.keys(i.value);
          if ((valueKeyList[0] = '0')) {
            var inner = this.parseInnerObject(i.value[0]);
         

            inner.forEach((el: any) => {
              items.push(el);
            });
          }
        }
      }
    });

    return items;
  }
}
