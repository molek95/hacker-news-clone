import { createSelector } from '@ngrx/store';
import { StoryState } from './story.reducer';
import { AppState } from '../app.state';
import { state } from '@angular/animations';

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

export const selectTitleFilter = createSelector(
  selectStories,
  (state: StoryState) => state.filter.titleFilter
)

export const selectTypeFilter = createSelector(
  selectStories,
  (state: StoryState) => state.filter.typeFilter
)

export const selectFilteredStories = createSelector(
  selectAllStories,
  selectTitleFilter,
  selectTypeFilter,
  (stories, titleFilter, typeFilter) => 
    stories.filter(story => story.title.toLowerCase().includes(titleFilter.toLowerCase()) &&
    (typeFilter === '' || typeFilter === 'all' || story.type.toLowerCase() === typeFilter.toLowerCase())
  )
);
