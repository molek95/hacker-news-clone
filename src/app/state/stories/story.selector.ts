import { createSelector } from '@ngrx/store';
import { StoryState } from './story.reducer';
import { AppState } from '../app.state';

export const selectStories = (state: AppState) => state.stories;

export const selectTopStoryIds = createSelector(
  selectStories,
  (state: StoryState) => state.topStoriesId
);

export const selectAllStories = createSelector(
  selectStories,
  (state: StoryState) => state.stories
);

export const selectPaginationIndexes = createSelector(
  selectStories,
  (state: StoryState) => state.pagination
);

export const selectFavourites = createSelector(
  selectStories,
  (state: StoryState) => state.favourites
);

export const selectHiddens = createSelector(
  selectStories,
  (state: StoryState) => state.hidden
);

export const selectLoadingStatus = createSelector(
  selectStories,
  (state: StoryState) => state.status
);
