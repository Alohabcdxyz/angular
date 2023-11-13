import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  baseApiUrl: string = environment.baseApiUrl;
  constructor(private http: HttpClient) {}

  getAllCategory(): Observable<Category[]> {
    return this.http.get<Category[]>(
      this.baseApiUrl + '/api/Category/GetAllCategory'
    );
  }

  addEmployee(addEmployeerequest: FormData): Observable<Category> {
    return this.http.post<Category>(
      this.baseApiUrl + '/api/Category/AddCategory',
      addEmployeerequest
    );
  }

  getCategory(id: number): Observable<Category> {
    return this.http.get<Category>(
      this.baseApiUrl + '/api/Category/GetCategory/' + id
    );
  }

  UpdateCategory(
    id: number,
    updateCategoryRequest: FormData
  ): Observable<Category> {
    return this.http.put<Category>(
      this.baseApiUrl + '/api/Category/UpdateCategory/' + id,
      updateCategoryRequest
    );
  }

  deleteCategory(id: number): Observable<Category> {
    return this.http.delete<Category>(
      this.baseApiUrl + '/api/Category/DeleteCategory/' + id
    );
  }
}
