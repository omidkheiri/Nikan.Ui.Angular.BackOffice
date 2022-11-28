import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LocationItem } from '../model/location.model';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor(private http: HttpClient) {}

  getLocations(id: string) {
    return this.http.get<LocationItem[]>(
      `${environment.serviceLocationAddress}/ServiceLocation?AccountId=${id}&SearchTerm=&PageNumber=1&PageSize=500&OrderBy=title`
    );
  }
  getLocation(id: any) {
    return this.http.get<LocationItem>(
      `${environment.serviceLocationAddress}/ServiceLocation/${id}`
    );
  }
  deleteLocation(id: any) {
    return this.http.delete(
      `${environment.serviceLocationAddress}/ServiceLocation/${id}`
    );
  }
}
