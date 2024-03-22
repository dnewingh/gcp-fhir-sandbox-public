import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FhirstoreDataService {
  private apiUrl = environment.fhirstoreServiceUrl;
  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
  
  getResource(relativeUrl: string): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + relativeUrl);
  }

  postResource(relativeUrl: string, resourcePayload: object): Observable<HttpResponse<any[]>> {
    return this.http.post<any[]>(this.apiUrl + relativeUrl, resourcePayload, { observe: 'response' });
  }
}
