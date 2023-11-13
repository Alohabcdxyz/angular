import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Register } from 'src/app/models/register.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  baseApiUrl: string = environment.baseApiUrl;
  constructor(private http: HttpClient) {}

  getProfile(userId: number): Observable<Register> {
    return this.http.get<Register>(
      this.baseApiUrl + '/api/Register/GetDetailUser/' + userId
    );
  }

  getUser(): Observable<Register[]> {
    return this.http.get<Register[]>(this.baseApiUrl + '/api/Register/GetUser');
  }

  updateUser(
    userId: number,
    updateUserRequest: Register
  ): Observable<Register> {
    return this.http.put<Register>(
      this.baseApiUrl + '/api/Register/UpdateContact/' + userId,
      updateUserRequest
    );
  }
}
