import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FhirstoreDataService {
  private apiUrl = environment.fhirstoreServiceUrl;
  constructor(private http: HttpClient) { }
  
  getResource(relativeUrl: string): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + relativeUrl);
  }

  postResource(relativeUrl: string, resourcePayload: object): Observable<any[]> {
    return this.http.post<any[]>(this.apiUrl + relativeUrl, resourcePayload);
  }
}
