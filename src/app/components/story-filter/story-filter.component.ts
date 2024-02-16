import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FilterComponent } from '../filter/filter.component';
import { Store } from '@ngrx/store';
import { setStoryTitleFilter, setStoryTypeFilter } from 'src/app/state/stories/story.actions';

@Component({
  selector: 'app-story-filter',
  templateUrl: './story-filter.component.html',
  styleUrls: ['./story-filter.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FilterComponent
  ]
})
export class StoryFilterComponent {
  private store = inject(Store)

  onFilterChange(titleFilter: string): void {
    this.store.dispatch(setStoryTitleFilter({titleFilter}));
  }

  onTypeChange(typeFilter: string): void {
    this.store.dispatch(setStoryTypeFilter({typeFilter}));
  }
}
