import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-task-container',
  templateUrl: './task-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskContainerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
