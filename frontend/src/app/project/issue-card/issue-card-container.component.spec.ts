import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueCardContainerComponent } from './issue-card-container.component';

describe('IssueCardContainerComponent', () => {
  let component: IssueCardContainerComponent;
  let fixture: ComponentFixture<IssueCardContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IssueCardContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueCardContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
