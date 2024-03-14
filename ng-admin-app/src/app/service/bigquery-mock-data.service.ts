import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BigqueryMockDataService {
  private apiUrl = 'https://us-central1-gcp-fhir-sandbox-lab-001.cloudfunctions.net/nodejs-http-fn-biqquery-service/bigquery/';
  //private apiUrl = 'http://localhost:8080/bigquery/';
  constructor(private http: HttpClient) { }
  getMockData(tableName: string): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + tableName);
  }
}
