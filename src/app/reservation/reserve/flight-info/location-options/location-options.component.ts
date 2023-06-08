import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-location-options',
  templateUrl: './location-options.component.html',
  styleUrls: ['./location-options.component.css']
})
export class LocationOptionsComponent implements OnInit {
@Input() Locations:any;
@Input() Type:any;
@Output() SelectedLocation = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }
  handleChange(e:any){
console.log(e.currentTarget.id);
this.SelectedLocation.emit(e.currentTarget.id)

  }
}
