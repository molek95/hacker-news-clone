import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryFilterComponent } from './story-filter.component';

describe('StoryFilterComponent', () => {
  let component: StoryFilterComponent;
  let fixture: ComponentFixture<StoryFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StoryFilterComponent]
    });
    fixture = TestBed.createComponent(StoryFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
