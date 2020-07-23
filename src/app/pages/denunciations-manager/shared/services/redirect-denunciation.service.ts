import { Injectable } from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map, timeout} from 'rxjs/operators';
import {PrimaryRecipient, SecondaryRecipient} from '../Models/Recipients-model';
import {Complaint} from '../../../search-denunciation/shared/ complaint.model';
import {FormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class RedirectDenunciationService {
  private api = environment.URL_API;


  constructor(private http: HttpClient) { }

  getRecipientPrimary(): Observable<PrimaryRecipient> {
    const url = `${this.api}/primaryEmail`;
    return this.http.get(url).pipe(
      catchError(this.handleError),
      map(this.jsonDatatoPrimaryRecipient)
    );
  }

  updateRecipientPrimary(email: string): Observable<PrimaryRecipient> {
    return this.http.put(`${this.api}/primaryEmail`, { email }).pipe(
      timeout(120000),
      catchError(this.handleError),
      map(this.jsonDatatoPrimaryRecipient),
    );
  }

  getAllSecondaryRecipients(): Observable<SecondaryRecipient[]> {
    const url = `${this.api}/recipients`;
    return this.http.get(url).pipe(
      timeout(120000),
      catchError(this.handleError),
      map(this.jsonDatatoSecondaryRecipients),
    );
  }

  newRecipientSecondary(data: SecondaryRecipient): Observable<SecondaryRecipient> {
    return this.http.post(`${this.api}/recipients`, data).pipe(
      timeout(120000),
      catchError(this.handleError),
      map(this.jsonDataToSecondaryRecipient),
    );
  }




  deleteStatus(code: string, stateId: number): Observable<Response>{
    return this.http.delete(`${this.api}/recipients/${code}`, {
        params: {
          state_id: stateId.toString()
        },
        observe: 'response'
      }).pipe(
      catchError(this.handleError),
      map(() => null)
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

  private jsonDatatoSecondaryRecipients(jsonData: any[]): SecondaryRecipient[] {
    const secondaryRecipients: SecondaryRecipient[] = [];
    jsonData.forEach(element => {
      secondaryRecipients.push({
        ... element as SecondaryRecipient,
        // timestamp: new Date (element.timestamp),
        // closed_at: new Date(element.closed_at),
        // createdAt: new Date(element.createdAt),
      });
    });

    return secondaryRecipients;
  }

  private jsonDatatoPrimaryRecipient(jsonData: any): (PrimaryRecipient) {
    let primaryRecipient = jsonData as PrimaryRecipient;
    primaryRecipient = { ... primaryRecipient};
    return primaryRecipient;
  }

  private jsonDataToSecondaryRecipient(jsonData: any): (SecondaryRecipient) {
    let secondaryRecipient = jsonData as SecondaryRecipient;
    secondaryRecipient = { ... secondaryRecipient};
    return secondaryRecipient;
  }


  private jsonDatatoStatusUpdate(jsonData: any): (any) {
    // let denunciation = jsonData as Complaint;
    // denunciation = { ... denunciation};
    return
    jsonData;
  }
  private handleError(error: any): Observable<any> {
    console.log('\n' + 'ERROR IN SERVICE DENUNCIATION SERVICE => ', error);
    return throwError(error);
  }

  // getByCode(id: string): Observable<Complaint> {
  //     const url = `${this.api}/recipients/${id}`;
  //     console.log(url);
  //     return this.http.get(url).pipe(
  //       timeout(120000),
  //       catchError(this.handleError),
  //       map(this.jsonDatatoDenunciation),
  //     );
  // }


  removeSecondaryRecipients(id: number): Observable<Response> {
    return this.http.delete(`${this.api}/recipients/${id}`).pipe(
      catchError(this.handleError),
      map(() => null)
    );
  }

  updateRecipientSecondary(data: SecondaryRecipient): Observable<SecondaryRecipient> {
    return this.http.put(`${this.api}/recipients/${data.id}`, data).pipe(
      timeout(120000),
      catchError(this.handleError),
      map(this.jsonDataToSecondaryRecipient),
    );
  }
}
