import { Injectable } from '@angular/core';
import { Observable, forkJoin, map, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { itemUrl, topStoriesUrl } from '../models/urls.consts';
import { Story } from '../models';

@Injectable({ providedIn: 'root' })
export class StoryService {
  constructor(private http: HttpClient) {}

  getTopStoryIds(): Observable<number[]> {
    return this.http
      .get(topStoriesUrl)
      .pipe(map((response: any) => response as number[]));
  }

  getStoriesBatch(ids: number[]): Observable<Story[]> {
    if (!ids || ids.length === 0) {
      return of([]);
    }
    return forkJoin(ids.map(id => this.getStoryById(id)));
  }

  private getStoryById(storyId: number): Observable<Story> {
    return this.http
      .get(`${itemUrl}/${storyId}.json`)
      .pipe(map((response: any) => response as Story));
  }
}
