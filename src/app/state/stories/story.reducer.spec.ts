import { Status } from 'src/app/models/status.enum';
import { Story } from 'src/app/models/story.model';
import { storyReducer, initialState } from './story.reducer';
import * as StoryActions from './story.actions';

describe('Story reducer', () => {
  it('should add story to favourite', () => {
    const action = StoryActions.addStoryToFavourite({ id: 1 });
    const newState = storyReducer(initialState, action);

    expect(newState.favourites).toContain(1);
  });

  it('should remove story from favourite', () => {
    const state = { ...initialState, favourites: [1] };
    const action = StoryActions.removeStoryFromFavourite({ id: 1 });
    const newState = storyReducer(state, action);

    expect(newState.favourites).not.toContain(1);
  });

  it('should add story to hidden', () => {
    const action = StoryActions.addStoryToHidden({ id: 1 });
    const newState = storyReducer(initialState, action);

    expect(newState.hidden).toContain(1);
  });

  it('should transition status to loading upon loading top stories', () => {
    const action = StoryActions.loadTopStoryIds();
    const newState = storyReducer(initialState, action);

    expect(newState.status).toEqual(Status.loading);
  });

  it('should transition status to success and update top stories id when top stories load successfully', () => {
    const topStoriesId = [1, 2, 3];
    const action = StoryActions.loadTopStoryIdsSuccess({ topStoriesId });
    const newState = storyReducer(initialState, action);

    expect(newState.status).toEqual(Status.success);
    expect(newState.topStoriesId).toEqual(topStoriesId);
  });

  it('should transition status to loading upon loading story by id', () => {
    const action = StoryActions.loadStoryById();
    const newState = storyReducer(initialState, action);

    expect(newState.status).toEqual(Status.loading);
  });

  it('should transition status to success and update stories when stories load successfully', () => {
    const newStories: Story[] = [
      {
        by: 'user',
        descendants: 1,
        id: 1,
        type: 'story',
        kids: [],
        score: 10,
        time: 1175727286,
        title: 'Story 1',
        url: 'url',
      },
    ];
    const action = StoryActions.loadStoryByIdSuccess({ newStories });
    const newState = storyReducer(initialState, action);

    expect(newState.status).toEqual(Status.success);
    expect(newState.stories).toEqual(newStories);
  });

  it('should transition status to error and update error message when stories load fails', () => {
    const error = 'Loading error';
    const action = StoryActions.loadSotriesFailure({ error });
    const newState = storyReducer(initialState, action);

    expect(newState.status).toEqual(Status.error);
    expect(newState.error).toEqual(error);
  });

  it('should transition status to loading upon start scrolling', () => {
    const action = StoryActions.startScrolling();
    const newState = storyReducer(initialState, action);

    expect(newState.status).toEqual(Status.loading);
  });

  it('should increase pagination from and to upon pagination increase', () => {
    const action = StoryActions.increasePagination();
    const newState = storyReducer(initialState, action);

    expect(newState.pagination.from).toEqual(initialState.pagination.to);
    expect(newState.pagination.to).toEqual(initialState.pagination.to + 20);
  });
});
