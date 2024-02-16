import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import {
  loadSotriesFailure,
  loadStoryById,
  loadStoryByIdSuccess,
  loadTopStoryIdsSuccess,
  loadTopStoryIds,
} from './story.actions';
import { catchError, combineLatest, from, map, of, switchMap, tap } from 'rxjs';
import { selectPaginationIndexes, selectTopStoryIds } from './story.selector';
import { StoryService } from 'src/app/services/story.service';

@Injectable()
export class StoryEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private storyService: StoryService
  ) {}

  loadTopStoryIds$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTopStoryIds),
      switchMap(() =>
        this.storyService.getTopStoryIds().pipe(
          map(topStoriesId => loadTopStoryIdsSuccess({ topStoriesId })),
          catchError(error => of(loadSotriesFailure({ error })))
        )
      )
    )
  );

  loadStoriesById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadStoryById),
      switchMap(() =>
        combineLatest([
          this.store.select(selectTopStoryIds),
          this.store.select(selectPaginationIndexes),
        ]).pipe(
          map(([topStoryIds, paginationIndexes]) =>
            topStoryIds.slice(paginationIndexes.from, paginationIndexes.to)
          ),
          switchMap(storyIds => this.storyService.getStoriesBatch(storyIds)),
          map(newStories => loadStoryByIdSuccess({ newStories })),
          catchError(error => of(loadSotriesFailure({ error })))
        )
      )
    )
  );
}
