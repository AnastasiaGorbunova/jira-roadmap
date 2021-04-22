import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-project-view-container',
  templateUrl: './project-view-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectViewContainerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
