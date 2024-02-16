import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FrontPageComponent } from './pages/front-page/front-page.component';
import { storyReducer } from './state/stories/story.reducer';
import { StoryEffects } from './state/stories/story.effects';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FilterComponent } from './components/filter/filter.component';
import { StoryFilterComponent } from './components/story-filter/story-filter.component';

@NgModule({
  declarations: [
    AppComponent,
    FrontPageComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(
      { stories: storyReducer }
    ),
    EffectsModule.forRoot([StoryEffects]),
    MatProgressSpinnerModule,
    InfiniteScrollModule,
    MatToolbarModule,
    MatButtonModule,
    MatSlideToggleModule,
    FormsModule,
    StoryFilterComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
