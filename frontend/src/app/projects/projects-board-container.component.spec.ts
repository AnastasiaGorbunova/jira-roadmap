import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsBoardContainerComponent } from './projects-board-container.component';

describe('ProjectsBoardContainerComponent', () => {
  let component: ProjectsBoardContainerComponent;
  let fixture: ComponentFixture<ProjectsBoardContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectsBoardContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsBoardContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
