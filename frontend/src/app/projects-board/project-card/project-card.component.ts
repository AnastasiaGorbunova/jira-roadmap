import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import { Project } from 'src/app/core/models/project.model';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectCardComponent implements OnInit {
  @Input() project: Project;
  @Output() onDeleteProject = new EventEmitter<string>();
  @Output() onNavigateToProject = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {}

  deleteProject(event: Event): void {
    event.stopPropagation();

    this.onDeleteProject.emit(this.project.id);
  }



  navigateToProject(): void {
    this.onNavigateToProject.emit(this.project.id);
  }
}
