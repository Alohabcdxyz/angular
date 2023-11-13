import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  baseApiUrl: string = environment.baseApiUrl;
  constructor(private http: HttpClient) {}

  getAllBills(): Observable<any[]> {
    return this.http.get<any>(this.baseApiUrl + '/api/Bill/GetAllBill');
  }

  updateOrderStatus(id: number): Observable<any> {
    // You can customize the API endpoint as needed
    return this.http.post<any>(
      this.baseApiUrl + '/api/Bill/ConfirmOrder/' + id,
      null
    );
  }
}
