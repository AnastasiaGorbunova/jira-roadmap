import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { RouterStoreActions } from '@app/root-store/features/router';
import { AppState } from '@app/root-store/state';
import { Store } from '@ngrx/store';
import { Task } from 'src/app/core/models/task.model';

@Component({
  selector: 'app-task-card-container',
  templateUrl: './task-card-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskCardContainerComponent {
  @Input() task: Task[];
  @Input() projectId: string;

  constructor(
    private _store$: Store<AppState>
  ) { }

  navigateToTask(taskId: string): void {
    this._store$.dispatch(RouterStoreActions.navigateTask({ taskId }));
  }  
}
