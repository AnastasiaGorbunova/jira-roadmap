import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTaskViewContainerComponent } from './project-task-view-container.component';

describe('ProjectTaskViewContainerComponent', () => {
  let component: ProjectTaskViewContainerComponent;
  let fixture: ComponentFixture<ProjectTaskViewContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectTaskViewContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectTaskViewContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
