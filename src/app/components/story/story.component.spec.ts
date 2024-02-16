import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { StoryComponent } from './story.component';
import { MemoizedSelector } from '@ngrx/store';
import {
  addStoryToFavourite,
  addStoryToHidden,
  removeStoryFromFavourite,
} from 'src/app/state/stories/story.actions';
import {
  selectFavourites,
  selectHiddens,
} from 'src/app/state/stories/story.selector';
import { MockBuilder } from 'ng-mocks';

describe('StoryComponent', () => {
  let component: StoryComponent;
  let fixture: ComponentFixture<StoryComponent>;
  let store: MockStore;
  let mockIsFavouriteSelector: MemoizedSelector<any, any>;
  let mockIsHiddenSelector: MemoizedSelector<any, any>;

  beforeEach(() => {
    return MockBuilder(StoryComponent).provide(provideMockStore());
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);

    mockIsFavouriteSelector = store.overrideSelector(selectFavourites, false);
    mockIsHiddenSelector = store.overrideSelector(selectHiddens, false);

    component.id = 123;

    spyOn(store, 'dispatch');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch addToFavourites', () => {
    component.addToFavourites();
    expect(store.dispatch).toHaveBeenCalledWith(
      addStoryToFavourite({ id: component.id })
    );
  });

  it('should dispatch removeFromFavourites', () => {
    component.removeFromFavourites();
    expect(store.dispatch).toHaveBeenCalledWith(
      removeStoryFromFavourite({ id: component.id })
    );
  });

  it('should dispatch hideStory', () => {
    component.hideStory();
    expect(store.dispatch).toHaveBeenCalledWith(
      addStoryToHidden({ id: component.id })
    );
  });

  it('should open new tab on navigateToUrl', () => {
    spyOn(window, 'open');
    component.url = 'test';
    component.navigateToUrl();
    expect(window.open).toHaveBeenCalledWith('test', '_blank');
  });
});
