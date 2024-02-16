import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import {  map } from 'rxjs';
import { UnixTimeToDatePipe } from 'src/app/pipes/unix-time-to-date.pipe';
import { addStoryToFavourite, addStoryToHidden, removeStoryFromFavourite } from 'src/app/state/stories/story.actions';
import { selectFavourites, selectHiddens } from 'src/app/state/stories/story.selector';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatCardModule, 
    CommonModule, 
    MatButtonModule, 
    RouterLink, 
    UnixTimeToDatePipe
],
})
export class StoryComponent {
  @Input() by!: string;
  @Input() descendants!: number;
  @Input() id!: number;
  @Input() score!: number;
  @Input() time!: number;
  @Input() title!: string;
  @Input() url!: string;
  @Input() type!: string;

  private store = inject(Store)

  readonly isFavourite$ = this.store.select(selectFavourites).pipe(
    map(favourites => favourites.includes(this.id))
  )

  readonly isHidden$ = this.store.select(selectHiddens).pipe(
    map(hiddens => hiddens.includes(this.id))
  )

  addToFavourites(): void {
    this.store.dispatch(addStoryToFavourite({id: this.id}))
  }

  removeFromFavourites(): void {
    this.store.dispatch(removeStoryFromFavourite({id: this.id}))
  }

  hideStory(): void {
    this.store.dispatch(addStoryToHidden({id: this.id}))
  }

  navigateToUrl(): void {
    window.open(this.url, '_blank')
  }
}
