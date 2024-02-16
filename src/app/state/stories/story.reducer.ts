import { createReducer, on } from '@ngrx/store';
import {
  addStoryToFavourite,
  addStoryToHidden,
  increasePagination,
  loadSotriesFailure,
  loadStoryById,
  loadStoryByIdSuccess,
  loadTopStoryIdsSuccess,
  loadTopStoryIds,
  removeStoryFromFavourite,
  startScrolling,
  setStoryTitleFilter,
  setStoryTypeFilter,
} from './story.actions';
import { Story } from 'src/app/models/story.model';
import { Status } from 'src/app/models/status.enum';

export interface StoryState {
  topStoriesId: number[];
  favourites: number[];
  hidden: number[];
  stories: Story[];
  status: Status;
  pagination: {
    from: number;
    to: number;
  };
  filter: {
    titleFilter: string;
    typeFilter: string;
  }
  error?: string | null;
}

export const initialState: StoryState = {
  topStoriesId: [],
  favourites: [],
  hidden: [],
  stories: [],
  status: Status.init,
  pagination: {
    from: 0,
    to: 20,
  },
  filter: {
    titleFilter: '',
    typeFilter:  ''
  }
};

export const storyReducer = createReducer(
  initialState,
  on(addStoryToFavourite, (state, { id }) => ({
    ...state,
    favourites: [...state.favourites, id],
  })),
  on(removeStoryFromFavourite, (state, { id }) => ({
    ...state,
    favourites: state.favourites.filter(storyId => storyId !== id),
  })),
  on(addStoryToHidden, (state, { id }) => ({
    ...state,
    hidden: [...state.hidden, id],
  })),

  on(loadTopStoryIds, state => ({ ...state, status: Status.loading })),
  on(loadTopStoryIdsSuccess, (state, { topStoriesId }) => ({
    ...state,
    topStoriesId,
    error: null,
    status: Status.success,
  })),

  on(loadStoryById, state => ({ ...state, status: Status.loading })),
  on(loadStoryByIdSuccess, (state, { newStories }) => ({
    ...state,
    stories: [...state.stories, ...newStories],
    error: null,
    status: Status.success,
  })),

  on(loadSotriesFailure, (state, { error }) => ({
    ...state,
    error,
    status: Status.error,
  })),

  on(startScrolling, state => ({ ...state, status: Status.loading })),
  on(increasePagination, state => ({
    ...state,
    pagination: {
      from: state.pagination.to,
      to: state.pagination.to + 20,
    },
  })),

  on(setStoryTitleFilter, (state, { titleFilter }) => ({...state, filter: {...state.filter, titleFilter}})),
  on(setStoryTypeFilter, (state, { typeFilter }) => ({...state, filter: {...state.filter, typeFilter}}))
);
