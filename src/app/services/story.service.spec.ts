import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { itemUrl, topStoriesUrl } from '../models/urls.consts';
import { StoryService } from './story.service';

describe('StoryService', () => {
  let service: StoryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StoryService],
    });

    service = TestBed.inject(StoryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should fetch top story IDs', () => {
    const mockData = [1, 2, 3];

    service.getTopStoryIds().subscribe((data: any) => {
      expect(data.length).toBe(3);
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne(topStoriesUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should fetch stories by IDs', () => {
    const mockData = [{ id: 1, by: 'John', title: 'Test' }];
    const ids = [1];

    service.getStoriesBatch(ids).subscribe((data: any) => {
      expect(data.length).toBe(1);
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne(`${itemUrl}/1.json`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData[0]);
  });
});
