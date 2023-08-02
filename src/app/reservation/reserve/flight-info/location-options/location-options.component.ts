import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-location-options',
  templateUrl: './location-options.component.html',
  styleUrls: ['./location-options.component.css']
})
export class LocationOptionsComponent implements OnInit,OnChanges {
@Input() Locations:any;
@Input() Type:any;
@Input() Value:any;
value:string;
@Input() mode:any;
@Output() SelectedLocation = new EventEmitter<any>();
  loadedLocations: any;
  constructor(private http:HttpClient) {



    this.http
    .get<any>(
      `${environment.serviceLocationAddress}/ServiceLocation?accountId=&SearchTerm=&PageNumber=1&PageSize=500&OrderBy=Title`
    ).subscribe((data: any) => {

this.loadedLocations=data;

    })




   }
  ngOnChanges(changes: SimpleChanges) {
   
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'Value': {
            this.value=changes['Value'].currentValue
          }
        }
      }
    }
  }
  ngOnInit(): void {

      
      
  }
  handleChange(e:any){
console.log(e.currentTarget.id);
this.SelectedLocation.emit(e.currentTarget.id)

  }
}
