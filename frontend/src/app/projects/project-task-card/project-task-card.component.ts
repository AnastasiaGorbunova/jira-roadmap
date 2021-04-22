import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-project-task-card',
  templateUrl: './project-task-card.component.html',
  styleUrls: ['./project-task-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectTaskCardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
