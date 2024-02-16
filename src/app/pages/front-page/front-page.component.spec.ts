import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { MemoizedSelector } from '@ngrx/store';
import {
  loadStoryById,
  startScrolling,
  increasePagination,
  loadTopStoryIds,
} from 'src/app/state/stories/story.actions';
import { selectLoadingStatus } from 'src/app/state/stories/story.selector';
import { ThemeService } from 'src/app/services/theme.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FrontPageComponent } from './front-page.component';

describe('FrontpageComponent', () => {
  let component: FrontPageComponent;
  let fixture: ComponentFixture<FrontPageComponent>;
  let store: MockStore;
  let themeService: ThemeService;
  let loadingSelector: MemoizedSelector<any, any>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [FrontPageComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        provideMockStore(),
        {
          provide: ThemeService,
          useValue: {
            initTheme: () => null,
            isDarkMode: () => null,
            updateTheme: () => null,
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FrontPageComponent);
    component = fixture.componentInstance;

    store = TestBed.inject(MockStore);
    themeService = TestBed.inject(ThemeService);

    loadingSelector = store.overrideSelector(selectLoadingStatus, false);

    spyOn(store, 'dispatch');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadTopStories and loadStoryById on init', () => {
    expect(store.dispatch).toHaveBeenCalledWith(loadTopStoryIds());
    expect(store.dispatch).toHaveBeenCalledWith(loadStoryById());
  });

  it('should dispatch startScrolling and increasePagination on scrollDown', fakeAsync(() => {
    component.onScrollDown();
    tick(300);

    expect(store.dispatch).toHaveBeenCalledWith(startScrolling());
    expect(store.dispatch).toHaveBeenCalledWith(increasePagination());
  }));

  it('should call updateTheme on toggleDarkMode', () => {
    spyOn(themeService, 'updateTheme');

    component.toggleDarkMode();

    expect(themeService.updateTheme).toHaveBeenCalled();
  });
});
