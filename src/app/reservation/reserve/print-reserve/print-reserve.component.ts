import { Component, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DxReportViewerComponent} from 'devexpress-reporting-angular'; 
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-print-reserve',
  templateUrl: './print-reserve.component.html',
  styleUrls: ['./print-reserve.component.css', 

  ]
})
export class PrintReserveComponent implements OnInit {
  hostUrl=environment.PrintUrl;
  reportUrl: string = "ab481c1f-7084-4195-1b24-08db20ce58be";
  invokeAction: string = '/DXXRDV';
  tripUrl: string;
  constructor(private route:ActivatedRoute,private router:Router) { 



route.params.subscribe((data:any)=>{

console.log(data);
 this.tripUrl=router.url.split('/')[4];
this.reportUrl=this.tripUrl+"|"+data.reserveId;
  
})
  }
  @ViewChild(DxReportViewerComponent, { static: false }) viewer: DxReportViewerComponent;

 


  ngOnInit(): void {
  }
  close(){
console.log();

    this.router.navigate(['/dashboard/reserve/Payment/'+this.tripUrl])

  }
}
