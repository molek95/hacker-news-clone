import { createAction, props } from '@ngrx/store';
import { Story } from 'src/app/models/story.model';

export const addStoryToFavourite = createAction(
  '[Story] Story marked as favourite',
  props<{ id: number }>()
);

export const removeStoryFromFavourite = createAction(
  '[Story] Story removed from hidden',
  props<{ id: number }>()
);

export const addStoryToHidden = createAction(
  '[Story] Story added to hidden',
  props<{ id: number }>()
);

export const loadTopStoryIds = createAction('[Story] Top Stories IDs Loaded');

export const loadTopStoryIdsSuccess = createAction(
  '[Story] Top Stories ID Load Success',
  props<{ topStoriesId: number[] }>()
);

export const loadStoryById = createAction('[Story] Load stories');

export const loadStoryByIdSuccess = createAction(
  '[Story] Load Success',
  props<{ newStories: Story[] }>()
);

export const loadSotriesFailure = createAction(
  '[Story] Load Failure',
  props<{ error: string }>()
);

export const startScrolling = createAction('[Story] Start scrolling');

export const increasePagination = createAction('[Story] Increase pagination');

export const setStoryTitleFilter = createAction(
    '[Story] Set Title Filter',
    props<{ titleFilter: string }>()
);

export const setStoryTypeFilter = createAction(
    '[Story] Set Type Filter',
    props<{ typeFilter: string }>()
);