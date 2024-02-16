import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { StoryEffects } from './story.effects';
import * as StoryActions from './story.actions';
import { Story } from 'src/app/models/story.model';
import { StoryService } from 'src/app/services/story.service';

describe('StoryEffects', () => {
  let actions$: Observable<Action>;
  let effects: StoryEffects;
  let storyService: StoryService;
  let store: MockStore;
  let mockStories: Story[];

  const initialState = {
    stories: {
      topStoryIds: [1, 2, 3],
      paginationIndexes: { from: 0, to: 3 },
      entities: {},
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        StoryEffects,
        provideMockActions(() => actions$),
        provideMockStore({ initialState }),
      ],
    });

    effects = TestBed.inject(StoryEffects);
    storyService = TestBed.inject(StoryService);
    store = TestBed.inject(MockStore);

    mockStories = [
      {
        by: 'user',
        descendants: 1,
        id: 1,
        kids: [],
        score: 250,
        time: 1175727286,
        title: 'Story 1',
        type: 'story',
        url: 'url',
      },
    ];
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should dispatch loadTopStoryIdsSuccess when service returns top story ids', () => {
    const action = StoryActions.loadTopStoryIds();
    const outcome = StoryActions.loadTopStoryIdsSuccess({
      topStoriesId: initialState.stories.topStoryIds,
    });

    actions$ = of(action);
    spyOn(storyService, 'getTopStoryIds').and.returnValue(
      of(initialState.stories.topStoryIds)
    );

    effects.loadTopStoryIds$.subscribe(action => {
      expect(action).toEqual(outcome);
    });
  });
});
