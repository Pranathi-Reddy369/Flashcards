import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, switchMap, of } from 'rxjs';
import { Bookmark } from '../models/app.model';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {
  private baseUrl = 'http://localhost:3002/bookmarks';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Bookmark[]> {
    return this.http.get<Bookmark[]>(this.baseUrl);
  }

  add(bookmark: Bookmark): Observable<Bookmark> {
    return this.http.post<Bookmark>(this.baseUrl, bookmark);
  }

  /**
   * Remove bookmark by setId and cardId combination
   */
  remove(setId: string, cardId: number): Observable<any> {
    return this.findByCard(setId, cardId).pipe(
      switchMap((bookmarks) => {
        if (bookmarks.length > 0) {
          const bookmarkId = bookmarks[0].id;
          return this.http.delete(`${this.baseUrl}/${bookmarkId}`);
        }
        return of(null);
      })
    );
  }

  /**
   * Check if a specific card in a set is already bookmarked
   */
  isBookmarked(setId: string, cardId: number): Observable<boolean> {
    return this.findByCard(setId, cardId).pipe(
      map((bookmarks) => bookmarks.length > 0)
    );
  }

  /**
   * Finds all bookmarks for a specific setId + cardId
   */
  findByCard(setId: string, cardId: number): Observable<Bookmark[]> {
    return this.http.get<Bookmark[]>(`${this.baseUrl}?setId=${setId}&cardId=${cardId}`);
  }
}
