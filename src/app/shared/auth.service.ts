import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  endpoint = 'http://localhost:3333';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  public currentUser: any;

  constructor(
    private http: HttpClient,
    public router: Router
  ) {

    console.log('instanciando....')
  }

  // Sign-up
  signUp(user: User): Observable<any> {
    const api = `${this.endpoint}/users`;
    return this.http.post(api, user)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Sign-in
  signIn(user: User): Observable<User> {
    return this.http.post<any>(`${this.endpoint}/sessions`, user).pipe(
      catchError(this.handleError),
      map(this.jsonDataToUser)
    );
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    const authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }

  doLogout() {
    const removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['log-in']);
    }
  }

  // User profile
  getUserProfile(id): Observable<any> {

    const api = `${this.endpoint}/user-profile/${id}`;
    return this.http.get(api, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }

  // Error
  handleError(error: HttpErrorResponse) {
    return throwError(error);
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }

  private jsonDataToUser = (jsonData: any): User => {
    console.log('AuthService.jsonDataToUser() => ', jsonData);
    localStorage.setItem('access_token', jsonData.token)
    const output = jsonData.user as User;
    this.currentUser = output;

    // this.router.navigate(['user-profile/' + res.msg._id]);
    return output;
  }
}
