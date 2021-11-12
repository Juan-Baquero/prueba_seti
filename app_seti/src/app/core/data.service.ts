/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { promise } from 'selenium-webdriver';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  public REST_API_SERVER = environment.url;
  data: Observable<any>[];
  headers;
  consultas=[];

  constructor(public http: HttpClient) {
    
    for (let i = 1; i <= 151; i++) {
      this.consultas.push(this.getData('pokemon/' + i));

    }
    


  }

  getData(consulta): Observable<any> {
    let httpHeaders = new HttpHeaders();
    // httpHeaders = httpHeaders.set('Access-Control-Allow-Origin', '*');
    httpHeaders = httpHeaders.set('Accept', 'gzip');
    return this.http
      .get(environment.url_pokemon + consulta, {
        headers: httpHeaders
      })
      .pipe(retry(3), catchError(this.handleError));
  }

  getResultMatch(id_1,id_2): Observable<any> {
    let httpHeaders = new HttpHeaders();
    // httpHeaders = httpHeaders.set('Access-Control-Allow-Origin', '*');
    httpHeaders = httpHeaders.set('Accept', 'gzip');
    return this.http
      .get(environment.url +'match_result/'+ id_1+'/'+id_2, {
        headers: httpHeaders
      })
      .pipe(retry(3), catchError(this.handleError));
  }
  getReportMatch(): Observable<any> {
    let httpHeaders = new HttpHeaders();
    // httpHeaders = httpHeaders.set('Access-Control-Allow-Origin', '*');
    httpHeaders = httpHeaders.set('Accept', 'gzip');
    return this.http
      .get(environment.url +'match_report', {
        headers: httpHeaders
      })
      .pipe(retry(3), catchError(this.handleError));
  }
  public handleError(error: HttpErrorResponse): any {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  getNumber(id){
    if(id<10)  return '00'+id;
    else{
      if(id>=10&&id<100) return '0'+id;
      else return id;
    }
  }
}
