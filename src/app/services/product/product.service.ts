import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  baseApiUrl: string = environment.baseApiUrl;
  constructor(private http: HttpClient) {}

  getAllProductList(): Observable<any[]> {
    return this.http.get<any>(this.baseApiUrl + '/api/Product/GetProducts');
  }

  addProduct(data: FormData) {
    return this.http.post(this.baseApiUrl + '/api/Product/PostProduct', data);
  }

  updateProduct(id: number, data: FormData) {
    return this.http.put(
      this.baseApiUrl + `/api/Product/PutProduct/${id}`,
      data
    );
  }

  deleteProduct(id: number) {
    return this.http.delete(
      this.baseApiUrl + `/api/Product/DeleteProduct/${id}`
    );
  }
}
