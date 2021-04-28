import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Task } from '@app/core/models/task.model';
import { emptyFieldValidator } from '@app/core/validation/validators';
import { validationMessages } from '@app/login/login.constants';
import { CreateProjectDialogComponent } from '@app/shared/dialogs/create-project-dialog/create-project-dialog.component';

@Component({
  selector: 'app-create-task-dialog',
  templateUrl: './create-task-dialog.component.html',
  styleUrls: ['./create-task-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateTaskDialogComponent implements OnInit {
  taskForm: FormGroup;

  validationMessages = validationMessages;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CreateProjectDialogComponent>,
  ) { }

  get isSubmitDisabled(): boolean {
    return !this.taskForm.valid;
  }

  hasFieldValidationError(fieldName: string, errorName: string): boolean {
    return this.taskForm.get(fieldName)?.hasError(errorName);
  }

  saveTask(): void {
    const { handleConfirm } = this.data;
    const name = this.taskForm.get('name').value;
    const description = this.taskForm.get('description').value;

    handleConfirm({ name, description } as Task);
    this.dialogRef.close();
  }

  ngOnInit() {
    this.initializeTaskForm();
  }

  private initializeTaskForm(): void {
    const { projectName, description } = this.data;
    this.taskForm = new FormGroup({
      name: new FormControl(projectName || '', {
        validators: [emptyFieldValidator, Validators.maxLength(50)]
      }),
      description: new FormControl(description || ''),
      // assignee: new FormControl(''),
    });
  }

}
