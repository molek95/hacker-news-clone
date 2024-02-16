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

@NgModule({
  declarations: [
    AppComponent,
    FrontPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(
      { stories: storyReducer }
    ),
    EffectsModule.forRoot([StoryEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
