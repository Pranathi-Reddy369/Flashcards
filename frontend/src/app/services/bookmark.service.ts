import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, switchMap, of } from 'rxjs';
import { Bookmark } from '../models/app.model';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {
  private baseUrl = 'http://localhost:4000/bookmarks';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getAll(): Observable<Bookmark[]> {
    return this.http.get<Bookmark[]>(this.baseUrl, {
      headers: this.getAuthHeaders()
    });
  }

  add(bookmark: Bookmark): Observable<Bookmark> {
    return this.http.post<Bookmark>(this.baseUrl, bookmark, {
      headers: this.getAuthHeaders()
    });
  }

  remove(setId: string, cardId: number): Observable<any> {
    return this.findByCard(setId, cardId).pipe(
      switchMap((bookmarks) => {
        if (bookmarks.length > 0) {
          // Use _id here for deleting
          const bookmarkId = bookmarks[0]._id;
          return this.http.delete(`${this.baseUrl}/${bookmarkId}`, {
            headers: this.getAuthHeaders()
          });
        }
        return of(null);
      })
    );
  }

  isBookmarked(setId: string, cardId: number): Observable<boolean> {
    return this.findByCard(setId, cardId).pipe(
      map((bookmarks) => bookmarks.length > 0)
    );
  }

  findByCard(setId: string, cardId: number): Observable<Bookmark[]> {
    return this.http.get<Bookmark[]>(`${this.baseUrl}/set/${setId}?cardId=${cardId}`, {
      headers: this.getAuthHeaders()
    });
  }
}
