import { Component, ChangeDetectionStrategy, Input, OnChanges, SimpleChanges } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { RouterStoreActions } from '@app/root-store/features/router';
import { AppState } from '@app/root-store/state';
import { Task } from 'src/app/core/models/task.model';
import { TasksStoreSelectors } from '@app/root-store/features/tasks';

@Component({
  selector: 'app-task-card-container',
  templateUrl: './task-card-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskCardContainerComponent implements OnChanges {
  @Input() task: Task;
  @Input() projectId: string;

  taskAssignee$: Observable<string>;

  constructor(
    private _store$: Store<AppState>
  ) { }

  navigateToTask(taskId: string): void {
    this._store$.dispatch(RouterStoreActions.navigateTask({ taskId }));
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.task && this.task && this.task.assignee_id) {
      this.taskAssignee$ = this._store$.pipe(select(TasksStoreSelectors.taskAssigneeSelector, { assigneeId: this.task.assignee_id }));
    }
  }
}
