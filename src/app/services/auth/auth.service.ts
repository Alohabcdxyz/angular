import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseApiUrl: string = environment.baseApiUrl;
  constructor(private http: HttpClient) {}
  private isLoggedIn = false; // You can use your own logic to check if the user is logged in

  public get loggedIn(): boolean {
    return this.isLoggedIn;
  }

  login(loginObj: any) {
    return this.http.post<any>(
      this.baseApiUrl + '/api/Register/Login',
      loginObj
    );
  }
}
