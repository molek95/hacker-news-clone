import { ChangeDetectionStrategy, Component, OnInit, Type, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { increasePagination, loadStoryById, loadTopStoryIds, startScrolling } from 'src/app/state/stories/story.actions';
import { selectAllStories, selectLoadingStatus } from 'src/app/state/stories/story.selector';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { DisplayedStoryDetails, Status, Story } from 'src/app/models';
import { Observable, map, of } from 'rxjs';
import { StoryComponent } from 'src/app/components/story/story.component';
import { JobComponent } from 'src/app/components/job/job.component';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.scss'],
  changeDetection:  ChangeDetectionStrategy.OnPush,
})
export class FrontPageComponent implements  OnInit {
  private store = inject(Store);

  readonly throttle = 300;
  readonly scrollDistance = 1;

  readonly stories$ = this.store.select(selectAllStories).pipe(
    map(stories => this.mapStoriesWithComponents(stories))
  )

  readonly isLoading$ = this.store
  .select(selectLoadingStatus)
  .pipe(map((isLoading: any) => isLoading === Status.loading));


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
