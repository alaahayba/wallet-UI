import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  baseURL: string = "http://localhost:3000";

  constructor(private http: HttpClient) {
  }

  login(mobile: string, password: string): Observable<any> {
    let body = { mobile, password };
    return this.http.post(`${this.baseURL}/login`, body);

  }

  register() {

  }

  getTransactions() {
    return this.http.get(this.baseURL + `/`)
  }
}
