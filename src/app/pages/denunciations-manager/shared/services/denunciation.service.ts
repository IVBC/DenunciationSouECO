import { Injectable } from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map, timeout} from 'rxjs/operators';
import {Denunciation} from '../Models/Denunciation-model';

@Injectable({
  providedIn: 'root'
})
export class DenunciationService {
  private api = environment.URL_API;


  constructor(private http: HttpClient) { }

  getAll(): Observable<Denunciation[]> {
    const url = `${this.api}/denunciations`;
    console.log(url);
    return this.http.get(url).pipe(
      catchError(this.handleError),
      map(this.jsonDatatoDenunciation)
    );
  }


  // getData(id: string, init: string, final: string, y1: string, y2: string, y3: string): Observable<(any | number)[]> {
  //   const url = `${this.api}/gateway/devices/${id}&${init}&${final}&${y1}&${y2}&${y3}`;
  //   // const url = `http://192.168.10.164:8080/gateway/devices/${id}&${init}&${final}&${y1}&${y2}&${y3}`;
  //   console.log(url);
  //   return this.http.get(url).pipe(
  //     timeout(120000),
  //     catchError(this.handleError),
  //     map(this.jsonDatatoAirData),
  //   );
  // }


  // PRIVATE METHODS

  private jsonDatatoDenunciation(jsonData: any[]): Denunciation[] {
    const denunciations: Denunciation[] = []
    jsonData.forEach(element => {
      denunciations.push({
        ... element as Denunciation,
        timestamp: new Date (element.timestamp),
        closed_at: new Date(element.closed_at),
        createdAt: new Date(element.createdAt),
      });
    });

    return denunciations;
  }
  // private jsonDatatoAirData(jsonData: []): (any | number)[] {
  //   return jsonData as (any | number)[];
  // }
  private handleError(error: any): Observable<any> {
    console.log('\n' + 'ERROR IN SERVICE DENUNCIATION SERVICE => ', error);
    return throwError(error);
  }
}
