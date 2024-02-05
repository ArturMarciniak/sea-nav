import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Papa } from 'ngx-papaparse';
import { map, Observable } from 'rxjs';
import { NavigationRoute } from '../interfaces/map.interface';
import { sourceFilePath } from '../utils/constants';
import { MappingUtils } from '../utils/mapping.utils';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient, private papa: Papa) {}

  public getRoutes(): Observable<NavigationRoute[]> {
    return this.getNavigationRoutes(sourceFilePath);
  }

  private getNavigationRoutes(filePath: string): Observable<NavigationRoute[]> {
    return this.http.get(filePath, { responseType: 'text' }).pipe(
      map((data) => {
        const parsedData = this.papa.parse(data, { delimiter: ',' });
        return MappingUtils.mapCsvToRouteArray(parsedData);
      })
    );
  }
}
