import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { News } from 'src/app/models/news.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  baseApiUrl: string = environment.baseApiUrl;
  constructor(private http: HttpClient) {}

  getAllNews(): Observable<News[]> {
    return this.http.get<News[]>(this.baseApiUrl + '/api/New/GetAllNews');
  }

  addNews(addNewsRequest: FormData): Observable<News> {
    return this.http.post<News>(
      this.baseApiUrl + '/api/New/AddNews',
      addNewsRequest
    );
  }

  getNews(id: number): Observable<News> {
    return this.http.get<News>(this.baseApiUrl + '/api/New/GetNews/' + id);
  }

  updateNews(id: number, updateNewsRequest: FormData): Observable<News> {
    return this.http.put<News>(
      this.baseApiUrl + '/api/New/UpdateNews/' + id,
      updateNewsRequest
    );
  }

  deleteNews(id: number): Observable<News> {
    return this.http.delete<News>(
      this.baseApiUrl + '/api/New/DeleteNews/' + id
    );
  }
}
