import { createAction, props } from '@ngrx/store';
import { Story } from 'src/app/models/story.model';

export const addStoryToFavourite = createAction(
  'Mark story as favourite',
  props<{ id: number }>()
);

export const removeStoryFromFavourite = createAction(
  'Remove story from favourite',
  props<{ id: number }>()
);

export const addStoryToHidden = createAction(
  'Story added to hidden',
  props<{ id: number }>()
);

export const loadTopStoryIds = createAction('Load top stories ID');

export const loadTopStoryIdsSuccess = createAction(
  'Top Stories ID Load Success',
  props<{ topStoriesId: number[] }>()
);

export const loadStoryById = createAction('Load stories');

export const loadStoryByIdSuccess = createAction(
  'Story Load Success',
  props<{ newStories: Story[] }>()
);

export const loadSotriesFailure = createAction(
  'Story Load Failure',
  props<{ error: string }>()
);

export const startScrolling = createAction('Start scrolling');

export const increasePagination = createAction('Increase pagination');

export const setStoryTitleFilter = createAction(
    'Set Title Filter',
    props<{ titleFilter: string }>()
);

export const setStoryTypeFilter = createAction(
    '[Story] Set Type Filter',
    props<{ typeFilter: string }>()
);