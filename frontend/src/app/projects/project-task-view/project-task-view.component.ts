import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-project-task-view',
  templateUrl: './project-task-view.component.html',
  styleUrls: ['./project-task-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectTaskViewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
