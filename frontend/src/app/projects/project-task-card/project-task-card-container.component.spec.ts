import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTaskCardContainerComponent } from './project-task-card-container.component';

describe('ProjectTaskCardContainerComponent', () => {
  let component: ProjectTaskCardContainerComponent;
  let fixture: ComponentFixture<ProjectTaskCardContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectTaskCardContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectTaskCardContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
