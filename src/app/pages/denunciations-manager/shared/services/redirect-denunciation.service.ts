import { Injectable } from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map, timeout} from 'rxjs/operators';
import {Recipient} from '../Models/Recipients-model';
import {Complaint} from '../../../search-denunciation/shared/ complaint.model';
import {FormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class RedirectDenunciationService {
  private api = environment.URL_API;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Recipient[]> {
    const url = `${this.api}/recipients`;
    console.log(url);
    return this.http.get(url).pipe(
      catchError(this.handleError),
      map(this.jsonDatatoRecipients)
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

  private jsonDatatoRecipients(jsonData: any[]): Recipient[] {
    const denunciations: Recipient[] = [];
    jsonData.forEach(element => {
      denunciations.push({
        ... element as Recipient,
        // timestamp: new Date (element.timestamp),
        // closed_at: new Date(element.closed_at),
        // createdAt: new Date(element.createdAt),
      });
    });

    return denunciations;
  }

  private jsonDatatoDenunciation(jsonData: any): (Complaint) {
    let denunciation = jsonData as Complaint;
    denunciation = { ... denunciation};
    return denunciation;
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

  getByCode(id: string): Observable<Complaint> {
      const url = `${this.api}/recipients/${id}`;
      console.log(url);
      return this.http.get(url).pipe(
        timeout(120000),
        catchError(this.handleError),
        map(this.jsonDatatoDenunciation),
      );
  }

  updateStatus(code: string, statusForm: FormGroup): Observable<any> {
    console.log(code, statusForm );
    const formData: any = new FormData();
    formData.append('state_id', statusForm.get('state_id').value);
    formData.append('details', statusForm.get('details').value);
    formData.append('file', statusForm.get('file').value);
    console.log(`${this.api}/recipients/${code}`);
    console.log(formData.get('state_id'));
    console.log(formData.get('details'));
    return this.http.put(`${this.api}/recipients/${code}`, formData).pipe(
      timeout(120000),
      catchError(this.handleError),
      map(this.jsonDatatoStatusUpdate),
    );
  }



}
