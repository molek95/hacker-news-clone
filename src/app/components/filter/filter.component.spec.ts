import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { FilterComponent } from './filter.component';
import { FormBuilder } from '@angular/forms';
import { MockBuilder } from 'ng-mocks';

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;
  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(() => {
    return MockBuilder(FilterComponent).provide(FormBuilder);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    component.filterForm = formBuilder.group({
      titleFilter: [''],
      typeFilter: [''],
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit filterChanged event when titleFilter value changes', fakeAsync(() => {
    spyOn(component.filterChanged, 'emit');
    component.filterForm.controls['titleFilter'].setValue('test');
    tick(300);
    fixture.detectChanges();
    expect(component.filterChanged.emit).toHaveBeenCalledWith('test');
  }));

  it('should emit typeChanged event when typeFilter value changes', () => {
    spyOn(component.typeChanged, 'emit');
    component.filterForm.controls['typeFilter'].setValue('test');
    fixture.detectChanges();
    expect(component.typeChanged.emit).toHaveBeenCalledWith('test');
  });
});
