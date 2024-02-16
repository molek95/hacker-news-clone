import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JobComponent } from './job.component';
import { MockBuilder } from 'ng-mocks';

describe('JobComponent', () => {
  let component: JobComponent;
  let fixture: ComponentFixture<JobComponent>;

  beforeEach(() => {
    return MockBuilder(JobComponent);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobComponent);
    component = fixture.componentInstance;
    component.title = 'Test Title';
    component.url = 'testUrl';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct title', () => {
    expect(component.title).toEqual('Test Title');
  });

  it('should have correct url', () => {
    expect(component.url).toEqual('testUrl');
  });

  it('should open new tab on navigateToUrl', () => {
    spyOn(window, 'open').and.callThrough();
    component.navigateToUrl();
    expect(window.open).toHaveBeenCalledWith('testUrl', '_blank');
  });
});
