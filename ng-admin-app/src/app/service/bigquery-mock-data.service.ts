import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BigqueryMockDataService {
  private apiUrl = environment.bigQueryServiceUrl;
  constructor(private http: HttpClient) { }
  getMockData(tableName: string): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + tableName);
  }
}
