import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCardContainerComponent } from './task-card-container.component';

describe('TaskCardContainerComponent', () => {
  let component: TaskCardContainerComponent;
  let fixture: ComponentFixture<TaskCardContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskCardContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskCardContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
