import { ChangeDetectionStrategy, Component, OnInit, Type, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { increasePagination, loadStoryById, loadTopStoryIds, startScrolling } from 'src/app/state/stories/story.actions';
import { selectFilteredStories, selectLoadingStatus } from 'src/app/state/stories/story.selector';
import { DisplayedStoryDetails, Status, Story } from 'src/app/models';
import { Observable, map, of } from 'rxjs';
import { StoryComponent } from 'src/app/components/story/story.component';
import { JobComponent } from 'src/app/components/job/job.component';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.scss'],
  changeDetection:  ChangeDetectionStrategy.OnPush,
})
export class FrontPageComponent implements  OnInit {
  private store = inject(Store);
  private themeService = inject(ThemeService);

  readonly throttle = 300;
  readonly scrollDistance = 1;

  readonly stories$ = this.store.select(selectFilteredStories).pipe(
    map(stories => this.mapStoriesWithComponents(stories))
  )

  readonly isLoading$ = this.store
  .select(selectLoadingStatus)
  .pipe(map((isLoading: Status) => isLoading === Status.loading));

  isDarkMode = false;

  constructor() {
    this.themeService.initTheme();
    this.isDarkMode = this.themeService.isDarkMode();
  }


  ngOnInit(): void {
    this.store.dispatch(loadTopStoryIds());
    this.store.dispatch(loadStoryById());
  }

  onScrollDown(): void {
    setTimeout(() => {
      this.store.dispatch(startScrolling());
    }, 200);
    this.store.dispatch(increasePagination());
  }

  toggleDarkMode(): void {
    this.isDarkMode = this.themeService.isDarkMode();
    this.isDarkMode
      ? this.themeService.updateTheme('light-mode')
      : this.themeService.updateTheme('dark-mode');
  }

  private mapStoriesWithComponents(stories: Story[]): Observable<
  {
    component: Type<StoryComponent | JobComponent>;
    inputs: DisplayedStoryDetails;
  }[]
> {
  return of(stories).pipe(
    map(stories =>
      stories.map(story => {
        const { id, type, by, descendants, score, time, title, url } = story;
        return {
          component: story.type === 'story' ? StoryComponent : JobComponent,
          inputs: { id, type, by, descendants, score, time, title, url },
        };
      })
    )
  );
  }
}
