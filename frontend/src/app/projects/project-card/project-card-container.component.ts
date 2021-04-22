import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Project } from 'src/app/core/models/project.model';
import { ProjectsService } from 'src/app/core/services/projects.service';

@Component({
  selector: 'app-project-card-container',
  templateUrl: './project-card-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectCardContainerComponent implements OnInit {
  @Input() project: Project[];

  constructor(
    private _projectsService: ProjectsService
  ) { }

  ngOnInit() {
  }

  deleteProject(projectId: string): void {
    this._projectsService.deleteProject(projectId);
  }

  editProject(projectId: string): void {
    //
  }
}
