import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadStoryById, loadTopStoryIds } from 'src/app/state/stories/story.actions';
import { selectAllStories } from 'src/app/state/stories/story.selector';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.scss'],
  changeDetection:  ChangeDetectionStrategy.OnPush
})
export class FrontPageComponent implements  OnInit {
  private store = inject(Store);

  readonly stories$ = this.store.select(selectAllStories)


  ngOnInit(): void {
    this.store.dispatch(loadTopStoryIds());
    this.store.dispatch(loadStoryById());
  }
}
