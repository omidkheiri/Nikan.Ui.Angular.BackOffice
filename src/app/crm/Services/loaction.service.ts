import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Location } from '../model/location.model';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor(private http: HttpClient) {}

  getLocation(id: string) {
    return this.http.get<Location[]>(
      `${environment.serviceLocationAddress}/ServiceLocation?AccountId=${id}&SearchTerm=&PageNumber=1&PageSize=500&OrderBy=Title`
    );
  }
}
