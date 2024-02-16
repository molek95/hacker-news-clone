import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockBuilder, MockComponent, MockedComponent, MockRender } from 'ng-mocks';
import { MemoizedSelector, Store } from '@ngrx/store';
import { StoryFilterComponent } from './story-filter.component';
import { setStoryTitleFilter, setStoryTypeFilter } from 'src/app/state/stories/story.actions';
import { FilterComponent } from '../filter/filter.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

describe('StoryFilterComponent', () => {
  let component: StoryFilterComponent;
  let fixture: ComponentFixture<StoryFilterComponent>;
  let store: MockStore;

  beforeEach(() => {
    return MockBuilder(StoryFilterComponent).provide(provideMockStore());
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryFilterComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    spyOn(store, 'dispatch');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch setStoryTitleFilter action onFilterChange', () => {
    const titleFilter = 'exampleTitle';

    component.onFilterChange(titleFilter);

    expect(store.dispatch).toHaveBeenCalledWith(setStoryTitleFilter({ titleFilter }));
  });

  it('should dispatch setStoryTypeFilter action onTypeChange', () => {
    const typeFilter = 'exampleType';

    component.onTypeChange(typeFilter);

    expect(store.dispatch).toHaveBeenCalledWith(setStoryTypeFilter({ typeFilter }));
  });
});