import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

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
@Output() SelectedLocation = new EventEmitter<any>();
  constructor() { }
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
