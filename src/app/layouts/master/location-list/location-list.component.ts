import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import CustomStore from 'devextreme/data/custom_store';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MenuComponent } from '../header/shared/menu.component';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.css'],
})
export class LocationListComponent implements OnInit, MenuComponent {
  openmenu = true;
  constructor(private httpClient: HttpClient, private router: Router) {
    lastValueFrom(
      httpClient.get(
        `${environment.serviceLocationAddress}/ServiceLocation?accountId=&SearchTerm=&PageNumber=1&PageSize=500&OrderBy=Title`
      )
    )
      .then((data: any) => {
        this.locations = data.filter((data:any)=>{return !data.doNotShowInReserveLocationList});
      })
      .catch((error) => {
        throw 'Data Loading Error';
      });
  }
  data: any;
  locations: any;
  ngOnInit(): void {}
  openReservePage(item: any) {
    this.router.navigate(['/dashboard/reserve/Reserve/', item]);
    this.openmenu = false;
  }
}
