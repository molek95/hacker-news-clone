import * as actions from './story.actions';
import { Story } from 'src/app/models/story.model';

describe('Story Actions', () => {
  it('should create addStoryToFavourite action', () => {
    const action = actions.addStoryToFavourite({ id: 1 });
    expect(action.type).toEqual('[Story] Story marked as favourite');
    expect(action.id).toEqual(1);
  });

  it('should create removeStoryFromFavourite action', () => {
    const action = actions.removeStoryFromFavourite({ id: 1 });
    expect(action.type).toEqual('[Story] Story removed from hidden');
    expect(action.id).toEqual(1);
  });

  it('should create addStoryToHidden action', () => {
    const action = actions.addStoryToHidden({ id: 1 });
    expect(action.type).toEqual('[Story] Story added to hidden');
    expect(action.id).toEqual(1);
  });

  it('should create loadTopStoryIds action', () => {
    const action = actions.loadTopStoryIds();
    expect(action.type).toEqual('[Story] Top Stories IDs Loaded');
  });

  it('should create loadTopStoryIdsSuccess action', () => {
    const action = actions.loadTopStoryIdsSuccess({ topStoriesId: [1, 2, 3] });
    expect(action.type).toEqual('[Story] Top Stories ID Load Success');
    expect(action.topStoriesId).toEqual([1, 2, 3]);
  });

  it('should create loadStoryById action', () => {
    const action = actions.loadStoryById();
    expect(action.type).toEqual('[Story] Load stories');
  });

  it('should create loadStoryByIdSuccess action', () => {
    const mockStories: Story[] = [
      {
        by: 'user',
        descendants: 1,
        id: 1,
        score: 10,
        time: 1611325500,
        title: 'Test',
        type: 'story',
        url: 'http://example.com',
        kids: [],
      },
    ];
    const action = actions.loadStoryByIdSuccess({ newStories: mockStories });
    expect(action.type).toEqual('[Story] Load Success');
    expect(action.newStories).toEqual(mockStories);
  });

  it('should create loadStoriesFailure action', () => {
    const action = actions.loadSotriesFailure({ error: 'error' });
    expect(action.type).toEqual('[Story] Load Failure');
    expect(action.error).toEqual('error');
  });

  it('should create startScrolling action', () => {
    const action = actions.startScrolling();
    expect(action.type).toEqual('[Story] Start scrolling');
  });

  it('should create increasePagination action', () => {
    const action = actions.increasePagination();
    expect(action.type).toEqual('[Story] Increase pagination');
  });
});
